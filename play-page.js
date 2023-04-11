var idCard = JSON.parse(localStorage.getItem("idCard"));
const containPlayPage = document.querySelector('.play-page') 
var saveArray = JSON.parse(localStorage.getItem("saveMovie"));

let currentImgSearch =''
let currentTitleSearch =''
let currentLanguageSearch=''
let currentOverviewSearch =''
let currentReleaseSearch =''
let currentVoteSearch =''
let dataVideos =''
let keyVideo =''
saveArray.forEach(item=>{
    if(idCard.toString()== item.id){
      {
        currentImgSearch = item.poster_path
        currentTitleSearch = item.title
        currentLanguageSearch= item.original_language
        currentOverviewSearch = item.overview
        currentReleaseSearch = item.release_date
        currentVoteSearch = item.vote_average
      }
           
    }
 
})
async function handleVideo(){
    let apiMovie =`https://api.themoviedb.org/3/movie/${idCard}/videos?api_key=21a74c685cbdafbea65d58ebd993168f`
   dataVideos = await fetch(apiMovie).then(res => res.json())
   .then(dataVideos=>{
   console.log(dataVideos.results[0].site)
   dataVideos.results[0].key = "https://www.youtube.com/embed/" + dataVideos.results[0].key
   console.log(dataVideos)
   keyVideo = dataVideos.results[0].key
    function ReRenderSuccess(){

      return(
            <div className="row">
            <div className="reference">
                <div className="col l-4 m-4 c-12">
                    <img src={currentImgSearch} alt=""/>
                </div>
                <div className="col l-8 m-8 c-12">
                    <h1><span>{currentTitleSearch}</span></h1>
                    <p><span>Status:</span> Trailer</p>
                    <h2> <span>language:</span> { currentLanguageSearch}</h2>
                    <h3><span>Overview:</span> {currentOverviewSearch}</h3>
                    <h4><span>Release date:</span> { currentReleaseSearch}</h4>
                    <small><span>Vote average:</span> {currentVoteSearch }</small>
                </div>
            </div>
                <iframe title="Video player" src={keyVideo}allowFullScreen></iframe>
        </div>
        )
       

}
 ReactDOM.render(<ReRenderSuccess/>,containPlayPage)
})
.catch(error=>{
    function ReRenderSearch(){

        return(
              <div className="row">
              <div className="reference">
                  <div className="col l-4 m-12 c-12">
                      <img src={currentImgSearch} alt=""/>
                  </div>
                  <div className="col l-8 m-12 c-12">
                      <h1><span>{currentTitleSearch}</span></h1>
                      <p><span>Status:</span> Trailer</p>
                      <h2> <span>language:</span> { currentLanguageSearch}</h2>
                      <h3><span>Overview:</span> {currentOverviewSearch}</h3>
                      <h4><span>Release date:</span> { currentReleaseSearch}</h4>
                      <small><span>Vote average:</span> {currentVoteSearch }</small>
                  </div>
              </div>
                 
          </div>
          )
          
        }
         ReactDOM.render(<ReRenderSearch/>,containPlayPage)
})
        








}  

handleVideo()


