const express = require("express");
const app = express();
app.use(express.json());
app.use((req , res, next)=>{
    const currentTime = new Date().toLocaleTimeString();
    console.log(`[${req.method}] ${req.url} - ${currentTime}`);
    next();
});
const PORT = process.env.PORT  || 5000;
let blogPosts = []; 
app.get("/",(req,res)=>{
    res.json({message:"Server is running"});
});

app.get("/posts",(req,res)=>{
    res.json(blogPosts);
});

app.get("/posts/:id",(req,res)=>{
    const postId = parseInt(req.params.id);
    const foundPost  = blogPosts.find(post => post.id === postId);
    if(!foundPost){
        return res.status(404).json({
            message:"Post not found"
        });
    }
    res.json(foundPost);
});

app.post("/posts",(req,res)=>{
   const newPost = req.body;
   if(!newPost.id || !newPost.title){
    return res.status(400).json({
        message:"ID and title are required"
    });
   }
    blogPosts.push(newPost);
    res.json({
        message:"Post added successfully",
        data: blogPosts
    });
});

app.put("/posts/:id",(req,res)=>{
   const postId = parseInt(req.params.id);
   const updatedPost = req.body;
   blogPosts = blogPosts.map(post=> post.id === postId? updatedPost:post);
   res.json({
    message:"Post updated successfully", 
    data:blogPosts
   });
});

app.delete("/posts/:id",(req,res)=>{
    const postId = parseInt(req.params.id);
    blogPosts=blogPosts.filter(post=>post.id !== postId);
    res.json({
        message:"Post deleted successfully",
        data:blogPosts
    });
});

app.post("/login",(req,res)=>{
    const {username , password} = req.body;
    res.json({
        message:"Login successfull",
        token:"mock-jwt-token-12345"
    });
});


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});