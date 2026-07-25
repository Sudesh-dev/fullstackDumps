const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())

const dbPath = path.join(__dirname, 'twitterClone.db')
let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}
initializeDBAndServer()

// API 1: Register
app.post('/register/', async (req, res) => {
  const {username, name, password, gender} = req.body
  if (password.length < 6) {
    res.status(400)
    return res.send('Password is too short')
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const selectUserQuery = `SELECT * FROM user WHERE username = '${username}';`
  const dbUser = await db.get(selectUserQuery)
  if (dbUser === undefined) {
    const createUserQuery = `
      INSERT INTO user (name, username, password, gender)
      VALUES (
        '${name}',
        '${username}',
        '${passwordHash}',
        '${gender}'
      );`
    await db.run(createUserQuery)
    res.status(200)
    res.send('User created successfully')
  } else {
    res.status(400)
    res.send('User already exists')
  }
})

// Authentication Middleware
const authenticateToken = (request, response, next) => {
  let jwtToken
  const authHeader = request.headers['authorization']
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(' ')[1]
  }
  if (jwtToken === undefined) {
    response.status(401)
    response.send('Invalid JWT Token')
  } else {
    jwt.verify(jwtToken, 'MY_SECRET_TOKEN', async (error, payload) => {
      if (error) {
        response.status(401)
        response.send('Invalid JWT Token')
      } else {
        request.username = payload.username
        next()
      }
    })
  }
}

// API 2: Login
app.post('/login/', async (request, response) => {
  const {username, password} = request.body
  const selectUserQuery = `SELECT * FROM user WHERE username = '${username}';`
  const dbUser = await db.get(selectUserQuery)
  if (dbUser === undefined) {
    response.status(400)
    response.send('Invalid user')
  } else {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password)
    if (isPasswordMatched === true) {
      const payload = {
        username: username,
      }
      const jwtToken = jwt.sign(payload, 'MY_SECRET_TOKEN')
      response.send({jwtToken})
    } else {
      response.status(400)
      response.send('Invalid password')
    }
  }
})

// API 3: User Tweets Feed
app.get('/user/tweets/feed/', authenticateToken, async (request, response) => {
  const {username} = request
  const getFeedQuery = `
    SELECT
      user.username,
      tweet.tweet,
      tweet.date_time AS dateTime
    FROM tweet
    INNER JOIN user ON tweet.user_id = user.user_id
    WHERE tweet.user_id IN (
      SELECT following_user_id
      FROM follower
      WHERE follower_user_id = (SELECT user_id FROM user WHERE username = '${username}')
    )
    ORDER BY tweet.date_time DESC
    LIMIT 4;
  `
  const tweets = await db.all(getFeedQuery)
  response.send(tweets)
})

// API 4: User Following
app.get('/user/following/', authenticateToken, async (request, response) => {
  const {username} = request
  const getFollowingQuery = `
    SELECT name
    FROM user
    WHERE user_id IN (
      SELECT following_user_id
      FROM follower
      WHERE follower_user_id = (SELECT user_id FROM user WHERE username = '${username}')
    );
  `
  const following = await db.all(getFollowingQuery)
  response.send(following)
})

// API 5: User Followers
app.get('/user/followers/', authenticateToken, async (request, response) => {
  const {username} = request
  const getFollowersQuery = `
    SELECT name
    FROM user
    WHERE user_id IN (
      SELECT follower_user_id
      FROM follower
      WHERE following_user_id = (SELECT user_id FROM user WHERE username = '${username}')
    );
  `
  const followers = await db.all(getFollowersQuery)
  response.send(followers)
})

// Helper Function for checking if user follows the author of a tweet
const checkFollowing = async (username, tweetId) => {
  const query = `
    SELECT *
    FROM tweet
    INNER JOIN follower ON tweet.user_id = follower.following_user_id
    WHERE tweet.tweet_id = ${tweetId} AND follower.follower_user_id = (
      SELECT user_id FROM user WHERE username = '${username}'
    );
  `
  const result = await db.get(query)
  return result !== undefined
}

// API 6: Get Specific Tweet
app.get('/tweets/:tweetId/', authenticateToken, async (request, response) => {
  const {tweetId} = request.params
  const {username} = request
  
  const isFollowing = await checkFollowing(username, tweetId)
  
  if (!isFollowing) {
    response.status(401)
    response.send('Invalid Request')
  } else {
    const getTweetQuery = `
      SELECT
        tweet.tweet,
        (SELECT COUNT(*) FROM like WHERE tweet_id = ${tweetId}) AS likes,
        (SELECT COUNT(*) FROM reply WHERE tweet_id = ${tweetId}) AS replies,
        tweet.date_time AS dateTime
      FROM tweet
      WHERE tweet.tweet_id = ${tweetId};
    `
    const tweet = await db.get(getTweetQuery)
    response.send(tweet)
  }
})

// API 7: Get Tweet Likes
app.get('/tweets/:tweetId/likes/', authenticateToken, async (request, response) => {
  const {tweetId} = request.params
  const {username} = request
  
  const isFollowing = await checkFollowing(username, tweetId)
  
  if (!isFollowing) {
    response.status(401)
    response.send('Invalid Request')
  } else {
    const getLikesQuery = `
      SELECT user.username
      FROM like
      INNER JOIN user ON like.user_id = user.user_id
      WHERE like.tweet_id = ${tweetId};
    `
    const likesList = await db.all(getLikesQuery)
    const likes = likesList.map(item => item.username)
    response.send({likes})
  }
})

// API 8: Get Tweet Replies
app.get('/tweets/:tweetId/replies/', authenticateToken, async (request, response) => {
  const {tweetId} = request.params
  const {username} = request
  
  const isFollowing = await checkFollowing(username, tweetId)
  
  if (!isFollowing) {
    response.status(401)
    response.send('Invalid Request')
  } else {
    const getRepliesQuery = `
      SELECT user.name, reply.reply
      FROM reply
      INNER JOIN user ON reply.user_id = user.user_id
      WHERE reply.tweet_id = ${tweetId};
    `
    const replies = await db.all(getRepliesQuery)
    response.send({replies})
  }
})

// API 9: Get All User's Tweets
app.get('/user/tweets/', authenticateToken, async (request, response) => {
  const {username} = request
  const getTweetsQuery = `
    SELECT
      tweet.tweet,
      COUNT(DISTINCT like.like_id) AS likes,
      COUNT(DISTINCT reply.reply_id) AS replies,
      tweet.date_time AS dateTime
    FROM tweet
    LEFT JOIN like ON tweet.tweet_id = like.tweet_id
    LEFT JOIN reply ON tweet.tweet_id = reply.tweet_id
    WHERE tweet.user_id = (SELECT user_id FROM user WHERE username = '${username}')
    GROUP BY tweet.tweet_id;
  `
  const tweets = await db.all(getTweetsQuery)
  response.send(tweets)
})

// API 10: Create a Tweet
app.post('/user/tweets/', authenticateToken, async (request, response) => {
  const {tweet} = request.body
  const {username} = request
  const dateTime = new Date().toJSON().substring(0, 19).replace('T', ' ')
  
  const createTweetQuery = `
    INSERT INTO tweet (tweet, user_id, date_time)
    VALUES (
      '${tweet}',
      (SELECT user_id FROM user WHERE username = '${username}'),
      '${dateTime}'
    );
  `
  await db.run(createTweetQuery)
  response.send('Created a Tweet')
})

// API 11: Delete a Tweet
app.delete('/tweets/:tweetId/', authenticateToken, async (request, response) => {
  const {tweetId} = request.params
  const {username} = request
  
  const checkOwnerQuery = `
    SELECT *
    FROM tweet
    WHERE tweet_id = ${tweetId} AND user_id = (SELECT user_id FROM user WHERE username = '${username}');
  `
  const isOwner = await db.get(checkOwnerQuery)
  
  if (isOwner === undefined) {
    response.status(401)
    response.send('Invalid Request')
  } else {
    const deleteTweetQuery = `
      DELETE FROM tweet
      WHERE tweet_id = ${tweetId};
    `
    await db.run(deleteTweetQuery)
    response.send('Tweet Removed')
  }
})

module.exports = app