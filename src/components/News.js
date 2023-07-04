import React,{useState,useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
    // articles=[
    //     {
    //         "source":{"id":"espn-cric-info","name":"ESPN Cric Info"},
    //         "author":null,
    //         "title":"Five famous people (and one cat) you didn't know have ESPNcricinfo profiles | ESPNcricinfo.com",
    //         "description":"Why do a footballer, a Nobel laureate and a prime minister (no, not Imran Khan) find themselves in the ESPNcricinfo player database? | ESPNcricinfo.com",
    //         "url":"http://www.espncricinfo.com/story/_/id/29102695/five-famous-people-one-cat-know-espncricinfo-profiles",
    //         "urlToImage":"https://a.espncdn.com/i/cricket/cricinfo/1221668_1296x1296.gif",
    //         "publishedAt":"2020-04-27T07:20:43Z",
    //         "content":"Why do a cat, a footballer, a Nobel laureate and a prime minister find themselves in the ESPNcricinfo database? Here are six player profiles you wouldn't have expected we had.\r\nPeter the catThe only … [+5504 chars]"
    //     }
    //     ,
    //         {
    //             "source":
    //             {
    //                 "id":"espn-cric-info","name":"ESPN Cric Info"},
    //                 "author":null,
    //                 "title":"PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //                 "description":"Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    //                 "url":"http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //                 "urlToImage":"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //                 "publishedAt":"2020-04-27T11:41:47Z",
    //                 "content":"Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    //             },
    //                 {
    //                     "source":{"id":"espn-cric-info","name":"ESPN Cric Info"},
    //                     "author":null,
    //                     "title":"What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //                     "description":"Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //                     "url":"http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //                     "urlToImage":"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //                     "publishedAt":"2020-03-30T15:26:05Z",
    //                     "content":"Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    //                     }
    // ]
    const [articles,setArticles]=useState([]);
    const [loading,setLoading]=useState(true);
    const [page,setPage]=useState(1);
    const [totalResults,settotalResults]= useState(0);

    const capitalizeFirstLetter=(str)=> {

        const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    
        return capitalized;
    }
    const updateNews=async (page)=>{
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        props.setProgress(10);
        setLoading(true);
        let data= await fetch(url);
        let parseddata= await data.json();
        setArticles(parseddata.articles);
        settotalResults(parseddata.totalResults);
        setLoading(false);
        props.setProgress(100);
    }
    useEffect(() => {
       updateNews();
       document.title=`${capitalizeFirstLetter(props.category)}- NewsHub`

    },[]);
    

    const handleNextClick= ()=>{
        // if(!page+1>Math.ceil(totalResults/props.pageSize)){

        // }
        
           setPage(page+1);
           updateNews(page);
        
    }
    const handlePreviousClick=()=>{
        setPage(page-1);
        updateNews(page);
    }
    const fetchMoreData=async ()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        // props.setProgress(10);
        // setLoading(true);
        let data= await fetch(url);
        let parseddata= await data.json();
        setArticles(articles.concat(parseddata.articles));
        settotalResults(parseddata.totalResults);
        // setLoading(false);
        // props.setProgress(100);
    }
    return (
      <div className='container'>
        <h2 className='text-center' style={{margin: '80px'}}>NewsHub- Top {capitalizeFirstLetter(props.category)} Headlines</h2>
         {loading && <Spinner/>} 
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!=totalResults}
          loader={!loading &&<Spinner/>} 
        >
            <div className="container">
        <div className="row">
            { articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                     <NewsItem title={element.title?element.title.slice(0,44):""} description={element.description?element.description.slice(0,77):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
            })}
             </div>
             </div>
             </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disable={page<=1} type="button" className="btn btn-dark" onClick={handlePreviousClick}> &larr; Previous</button>
        <button disable={page+1>Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
       
       
        
        
      </div> */}
      </div>
    )
  
}
News.defaultProps={
    country: "in",
    pageSize: 8,
    category: "general",
}
News.propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
