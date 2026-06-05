import express from 'express';
const app = express();

app.use(express.json())

app.get('/',(req, res)=>{
    try {
        res.status(200).json({message:"Home Page!!!"})
    } catch (error) {
        console.log("Error"+error.message);
    }
})

const PORT = 4000
app.listen(PORT,()=>{
    console.log(`Your server is running on ${PORT}`);
})