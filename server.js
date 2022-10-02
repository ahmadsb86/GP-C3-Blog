const { response } = require('express');
const express = require('express');
const app = express();
const { marked } = require('marked');
// import { marked } from 'marked';
const { Sequelize, Op, Model, DataTypes  } = require('sequelize');



const PORT = 5051;

// let posts = [{
//   title: "Welcome to our Blog",
//   subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque enim nemo soluta cumque minus consequuntur aliquid quo iusto molestias accusantium.",
//   content: marked.parse(`
//   Lorem **ipsum dolor sit amet consectetur adipisicing** elit. Eaque enim nemo soluta cumque minus consequuntur aliquid quo
  
//   Lorem dladlsajdkjas ldjas lkdjalksjdkl asjdlkasjdlkjsa dlkjsa
//   `),
//   by: "September 26th, 2022" ,
//   id: 1
// },
// {
//   title: "Religious Discrimination in Pakistan",
//   subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque enim nemo soluta cumque minus consequuntur aliquid quo iusto molestias accusantium.",
//   content: marked.parse(`
//   Lorem **ipsum dolor sit amet consectetur adipisicing** elit. Eaque enim nemo soluta cumque minus consequuntur aliquid quo
  
//   Lorem dladlsajdkjas ldjas lkdjalksjdkl asjdlkasjdlkjsa dlkjsa
//   `),
//   by: "September 26th, 2022",
//   id: 2
// }]

/* -------------------------------------------------------------------------- */
/*                                  ANCHOR DB                                 */
/* -------------------------------------------------------------------------- */


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite'
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const Post = sequelize.define('Post', {
  title: DataTypes.STRING,
  subtitle: DataTypes.STRING,
  content: DataTypes.TEXT,
  by: DataTypes.STRING,
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});



(async () => {
  await sequelize.sync();
})();

/* -------------------------------------------------------------------------- */
/*                                 ANCHOR API                                 */
/* -------------------------------------------------------------------------- */

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.use('/', express.static('public'))

app.get('/API/get-post-names', async (req,res)=>{
  let response = await Post.findAll()
  await res.send(response);
});


app.post('/API/get-post-content', async (req,res)=>{
  let response = await Post.findOne({
    where: {
      id: req.body.id
    }
  })
  response.content = marked.parse(response.content)
  res.send(response)
});

app.post('/API/create-post', (req,res)=>{
  Post.create({
    title: req.body.title,
    subtitle: req.body.subtitle,
    by: req.body.by,
    content: req.body.content
  });
  res.send(Post.findAll())
})

// Listening to the port
app.listen(PORT)

