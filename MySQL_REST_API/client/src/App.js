import React,{useState,useEffect} from "react";
import './App.css';
import  Axios  from "axios";

function App() {

  const [movieName,setMovieName] = useState('')
  const [review,setReview] = useState('')
  const [movieReviewList,setMovieList] = useState([])
  const [newReview, setnewReview] = useState("")

  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setMovieList(response.data)
    }
    )
  })

  const submitReview = () => {
      Axios.post('http://localhost:3001/api/insert',{
        
        movieName: movieName,
        movieReview: review,
      }).then(()=>{
        setMovieList([...movieReviewList,
           {movieName: movieName, movieReview:review}])
      })
  }


  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  }

  const updateReview = (movie) => {
    Axios.put(`http://localhost:3001/api/update`,{
      movieName: movie,
      movieReview: newReview,
    });
    setnewReview("");
  }


  return <div className="App">
    <h1>Crud application</h1>

      <div className='form'>
        <label>Movie name</label>
        <input type="text" 
        name="movieName" 
        onChange={(e)=>{
          setMovieName(e.target.value);
        }}
        />


        <label>Review</label>
        <input type="text" 
        name="review" 
        onChange={(e)=>{
          setReview(e.target.value);
        }}
        />
        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val)=>{
          return <div>
           <h1>{val.movieName}</h1> 
           <p>{val.movieReview}</p>
           <button onClick={() => {deleteReview(val.movieName)}}>Delete</button>
           <input 
            type = "text"
            id = "updateInput" 
            onChange={(e) =>{
            setnewReview(e.target.value);
           }}/>
           <button onClick={() =>{updateReview(val.movieName)}}>Update</button>
            </div>
        })}
      </div>

    </div>
}

export default App;
