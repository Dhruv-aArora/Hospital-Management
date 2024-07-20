import mongoose from 'mongoose'
import express from 'express'
import bcryptjs from 'bcryptjs'
import cors from 'cors'
console.log("refdc")
const userschem = new mongoose.Schema({
  name: String,
  lastname: String,
  password: String,
  email: String,
});
const appoint = new mongoose.Schema({
  name: String,
  email: String,
  purpose: String,
  mobile: String,
  department: String,
  date : String
})
const book = mongoose.model('book-apoint', appoint);
const user = mongoose.model('user', userschem);
const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect(
  'mongodb+srv://dhruv:dhruv11@cluster0.hqwhxqk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
);
app.get('/',(req,res)=>{
  res.json({"efs":"efs"})
})
app.post('/register', async(req, res) => {
  const data = req.body;
  const hash = await bcryptjs.genSalt(10);
  const hashedpassword = await bcryptjs.hash(data.password, hash);
  const a = new user({
    name: data.name,
    email: data.email,
    lastname: data.lastname,
    password: hashedpassword
  })
  const saved = await a.save();
  res.json(saved)

  
})
app.post('/login', async (req, res) => {
  const data = req.body;
  const findsome = await user.findOne({ email: data.email });
  if (!findsome) {
    res.json({
      "data":"user not exists"
    })
  }

  res.json(findsome)

  
})

app.post('/book', async (req, res) => {
  const data = req.body;
  console.log(data)
  const appoint = new book({
    name: data.name,
    email: data.email,
    purpose: data.purpose,
    mobile: data.mobile,
    department: data.department,
    date: data.date
    
  })
  const saved = await appoint.save();
  res.json(saved)

})

app.listen(8001)