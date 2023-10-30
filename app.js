//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash=require("lodash");

const homeStartingContent = "Are you ready to embark on a journey of self-discovery, creativity, and inspiration? Your Daily Journal is your gateway to a world of thoughts, stories, and experiences. Dive into the captivating world of personal blogs, where every day brings a new adventure.";
const aboutContent = "At Our Daily Journal, we believe that every day is an opportunity for growth, reflection, and connection. Our mission is to provide a platform where individuals from all walks of life can share their thoughts, experiences, and unique perspectives with the world. We're more than just a blog site; we're a community of storytellers, explorers, and dreamers..";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adpiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
// let newBlog="";
let allPosts=[];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  res.render("home", {homeContent:homeStartingContent, allPosts:allPosts});
});
app.get("/about", function(req,res){
  res.render("about", {aboutDetail:aboutContent});
});
app.get("/contact", (req,res)=>{
  res.render("contact", {contactDetail:contactContent});
});
app.get("/compose", function(req,res){
  res.render("compose");
});
app.get("/posts/:topic", (req,res)=>{
  let findPost=req.params.topic;
  let check=false;
  let index=0;
  let reqIdx;
  allPosts.forEach(function(ele){
    console.log(lodash.lowerCase([ele.title]), lodash.lowerCase([findPost]));
    if(lodash.lowerCase([ele.title])===lodash.lowerCase([findPost])){

      check=true;
   reqIdx=index;
    }
    index++;
  });
  if(check===true){
    console.log("Post Found😉!");
    console.log(index);
    res.render("post", {postTitle:allPosts[reqIdx].title, content:allPosts[reqIdx].content});
  }
  else{
    console.log("Post not found😒");
  }

});
app.post("/compose", (req,res)=>{
  // newBlog=req.body.postTitle;
  // console.log(req.body.postTitle);
  // res.redirect("/compose");
  let post={
    title:req.body.postTitle,
    content:req.body.postBody
  };
  // console.log(post);
  allPosts.push(post);
  // console.log(allPosts);
  res.redirect("/");
});
app.post("/home", (req,res)=>{
  let data=req.body;

  res.redirect(`/posts/${lodash.lowerCase([data.blogTitle])}`);
});
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
