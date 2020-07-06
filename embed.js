var mongoose = require("mongoose");

//fix MongoDB depreciation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/blog_demo");

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

var Post = mongoose.model("Post", postSchema);

var newUser = new User({
    email: "ron@hogwarts.edu",
    name: "Ron Weasley",
});

//Push a new post into the post array for newUser
// newUser.posts.push({
//     title: "Potter Puppet Pals was Alright",
//     content: "That's it. That's the post."
// });

// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "Thoughts on Apples",
//     content: "Red Delicous should be called Red Mealy and Crappy"
// });

// newPost.save(function(err, post){
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

User.findOne({name: "Ron Weasley"}, function(err, user){
    if(err) {
        console.log(err);
    } else {
        console.log(user);
        user.posts.push({
            title: "What is this Mysterious Ticking Noise",
            content: "Ron Weasley!"
        });
        user.save(function(err, user){
            if(err) {
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});