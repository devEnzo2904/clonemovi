const containMovie = document.querySelector('.movie')
let data = ''
var idCard = [];
let dataTrending =''
 async function movieMain(keyPage){
    
    let api =`https://api.themoviedb.org/3/discover/movie?api_key=21a74c685cbdafbea65d58ebd993168f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${keyPage}&with_watch_monetization_types=flatrate`
    data = await fetch(api).then(res=>res.json())
    const dataMovie = data.results;
    let apiTrending =`https://api.themoviedb.org/3/trending/all/day?api_key=21a74c685cbdafbea65d58ebd993168f`
    dataTrending = await fetch(apiTrending).then(res=>res.json())
    const dataTrendingMovie = dataTrending.results
    localStorage.setItem("saveDataTrending",JSON.stringify(dataTrendingMovie))
    
        for(let i=0;i<dataMovie.length;i++)
                {
                    if(dataMovie[i].title == undefined)
                    {
                        dataMovie[i].title = dataMovie[i].name
                    }
                    if(dataMovie[i].release_date == undefined)
                    {

                        dataMovie[i].release_date = dataMovie[i].first_air_date
                    }
                    dataMovie[i].poster_path = "https://image.tmdb.org/t/p/w500" + dataMovie[i].poster_path
                }
                for(let i=0;i<dataTrendingMovie.length;i++)
                {
                    if(dataTrendingMovie[i].title == undefined )
                    {
                        dataTrendingMovie[i].title = dataTrendingMovie[i].name
                    }
                    if(dataTrendingMovie[i].release_date == undefined)
                    {

                        dataTrendingMovie[i].release_date = dataTrendingMovie[i].first_air_date
                    }
                    dataTrendingMovie[i].poster_path = "https://image.tmdb.org/t/p/w500" + dataTrendingMovie[i].poster_path
                }
               
    function Render(){
        if(location.pathname== '/home.html')
        {
            return(
                 <div className ="row">
                {
                    dataMovie.map((item,index)=>
                        
                        <div className = "col l-3 m-4 c-4" key ={item.id} >
                            <div className="card" id={item.id}>
                                <div>
                                    <img  src={item.poster_path}/>                                 
                                </div>     
                                <h1>{item.title}</h1>
                                <small>{item.release_date}</small>
                            </div>
                        </div>
                        )
                }
            </div>
            )
        }
        else if(location.pathname== '/trending.html')
        {
            return(
                 <div className ="row">
                {
                    dataTrendingMovie.map((item,index)=>
                        
                        <div className = "col l-3 m-4 c-4" key ={item.id} >
                            <div className="card"  id={item.id}>
                                <div>
                                    <img  src={item.poster_path}/>                                 
                                </div>     
                                <h1>{item.title}</h1>
                                <small>{item.release_date}</small>
                            </div>
                        </div>
                        )
                }
            </div>
            )
        }
        else if(location.pathname== '/play-page.html')
        {
            return(
                 <div className ="row">
                {
                    dataTrendingMovie.map((item,index)=>
                        
                        <div className = "col l-3 m-4 c-4" key ={item.id} >
                            <div className="card" id={item.id}>
                                <div>
                                    <img  src={item.poster_path}/>                                 
                                </div>     
                                <h1>{item.title}</h1>
                                <small>{item.release_date}</small>
                            </div>
                        </div>
                        )
                }
            </div>
            )
        }
    }
       
    
      
            ReactDOM.render(<Render/>, containMovie)
        
              
                const getCards = document.querySelectorAll('.card');                      
                       getCards.forEach((getCard)=>{
                        getCard.addEventListener('click',()=>{                    
                            idCard[0] = getCard.getAttribute('id')
                            localStorage.setItem("idCard", JSON.stringify(idCard));
                            window.location.href = "./play-page.html";
                        })
                       }) 
                       var images = JSON.parse(localStorage.getItem("images"));
                       
            

}
movieMain()
function handlePage(){
    const nextPage = document.querySelector('.next-page a .next')
    let currentPage=1;
    nextPage.addEventListener('click',()=>{
    currentPage+=1
    movieMain(currentPage)
    if(currentPage==1)
    { 
        nextPage.style.display='block'
        prevPage.style.display='none'
    }
    
    else if(currentPage==2)
    {
         nextPage.style.display='block'
         prevPage.style.display='block'
    }
    else if(currentPage==3)
    {
         nextPage.style.display='none'
         prevPage.style.display='block'
    }
    
    
   
})
   
    const prevPage = document.querySelector('.next-page a .prev')
    prevPage.addEventListener('click',()=>{
    currentPage-=1
    movieMain(currentPage)
    if(currentPage==1)
    { 
        nextPage.style.display='block'
        prevPage.style.display='none'
    }
    
    else if(currentPage==2)
    {
         nextPage.style.display='block'
         prevPage.style.display='block'
    }
    else if(currentPage==3)
    {
         nextPage.style.display='none'
         prevPage.style.display='block'
    }
})
}
if(location.pathname =="/movie/home.html")
{
    handlePage()
}
    var arrayAllMovies = [];
 
    for(let i=1;i<=3;i++)
    {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=21a74c685cbdafbea65d58ebd993168f&language=en-US&sort_by=popularity.desc&include_adult=false&page=${i}&with_watch_monetization_types=flatrate`)
        .then(res=> res.json())
        .then((data)=>{
            data.results.forEach((component,index)=>
                {  
                   component.poster_path = "https://image.tmdb.org/t/p/w500" + component.poster_path
                  arrayAllMovies.push(component)
                  localStorage.setItem("save", JSON.stringify(arrayAllMovies));    
                }         
                )
        })     
    }
    
    var saveArrayTemporary = JSON.parse(localStorage.getItem("save"));
    var saveDataTrending = JSON.parse(localStorage.getItem("saveDataTrending"));
    let saveId =[]

    for(let i=0;i<saveArrayTemporary.length;i++){
        saveId.push(saveArrayTemporary[i].id)
    }
    saveDataTrending.forEach((item,index)=>{
        if(!saveId.includes(item.id)){
            saveArrayTemporary.push(item)
            arrayAllMovies.push(item)
        }
    })
    for(let i=0;i<saveArrayTemporary.length;i++)
    {
        if(saveArrayTemporary[i].title == undefined)
        {
            saveArrayTemporary[i].title = saveArrayTemporary[i].name
        }
        if(saveArrayTemporary[i].release_date == undefined)
        {

            saveArrayTemporary[i].release_date = saveArrayTemporary[i].first_air_date
        }
        saveArrayTemporary[i].poster_path = "https://image.tmdb.org/t/p/w500" + saveArrayTemporary[i].poster_path
    }
    localStorage.setItem("saveMovie", JSON.stringify(saveArrayTemporary));   
function searchMovie(){
  
    const valueInput = document.querySelector('#input-search').value
    const inputSearch = document.querySelector("#input-search")
    inputSearch.addEventListener('click',()=>{
        inputSearch.style.width ='200px'
    })
    inputSearch.addEventListener('blur',()=>{
        inputSearch.style.width ='90px'
    })
    const resultsSearch = document.querySelector(".results-search")
    let MoviesSearch = saveArrayTemporary.filter(comp=>{
       
        return comp.title.toLowerCase().includes(valueInput)
        
           
    })
    
    
   
        
   function RenderMoviesSearch(){
            if(valueInput.length==0)
            {
                return(
                    <div></div>
                )
            }
            else{
                return(
                    <div className ="contain-movies">
                    {
                     MoviesSearch.map(item=>
                             <div  className="contain-results" id={item.id} key={item.id}>
                                 <img src={item.poster_path}/>
                                 <ul>
                                     <li>{item.title}</li>
                                     <p>{item.release_date}</p>
                                 </ul>
                             </div>
                         )
                    }
                 </div>
                )
            }
            
   }

      ReactDOM.render(<RenderMoviesSearch/>,resultsSearch)
      const containResults = document.querySelectorAll('.contain-results');
        containResults.forEach((containResult)=>{
        containResult.addEventListener('click',()=>{      
        idCard[0]= containResult.getAttribute('id')
        localStorage.setItem("idCard", JSON.stringify(idCard));
        window.location.href = "./play-page.html";
        })
       }) 
       
       
} 
searchMovie()
 


  
    


   

    


