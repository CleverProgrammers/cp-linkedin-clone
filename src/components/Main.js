import styled from "styled-components";
import {useEffect,useState} from "react";
import PostModal from "./PostModal";
import {connect} from "react-redux";
import {getArticlesAPI} from "../actions";
import ReactPlayer from "react-player";


const Main = (props) => {
   
  const[showModal, setShowModal] = useState("close");

  useEffect(() =>{
    props.getArticles();
  },[]);
  
  const handleClick = (e) => {
    e.preventDefault();
    if(e.target !== e.currentTarget){
      return;
    }
    switch(showModal){
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open"); 
        break;
      default:
        setShowModal("close");
        break;
    }
  };

  return(
    <>
    {
      props.articles.length === 0 ? (
      <p>There are no articles</p>
  ) : (
   <Container>
  <ShareBox> 
   <div>
  { props.user && props.user.photoURL ? (
    <img src={ props.user.photoURL} />
  ):(
 
  <img src="/images/user.svg" alt="" />
  )}
  <button onClick={handleClick}
  disabled={props.loading ? true : false}> Start a post</button>
  </div>

  <div>
  <button>
  <img onClick={handleClick} src="/images/photo-icon.svg" alt="" />
  <span>photo</span>
  </button>

  <button>
  <img onClick={handleClick} src="/images/video-icon.svg" alt="" />
  <span>Video</span>
  </button>

  <button>
  <img onClick={handleClick} src="/images/event-icon.svg" alt="" />
  <span>Event</span>
  </button>

  <button>
  <img onClick={handleClick} src="/images/article-icon.svg" alt="" />
  <span>Write article</span>
  </button>
  

  </div>
  </ShareBox>
  <Content>
    {props.loading && <img src="./images/loader.gif" />}
    {props.articles.length > 0 && 
    props.articles.map((article, key) => (
      <Article key={key}>
    <SharedActor>
    <a>
     <img src={article.actor.image} alt="" />
     <div>
       <span>{article.actor.title}</span>
       <span>{article.actor.description}</span>
       <span>{article.actor.date.toDate().toLocaleString()}</span>
     
     </div>
    </a>
    <button>
      <img src="/images/ellipsis.svg" alt="" />
    </button>
    
    </SharedActor>
    <Discription>{article.description}</Discription>
    <SharedImg> 
     <a>
     {
      !article.shareImg && article.video ? (
        <ReactPlayer width={"100%"} url={article.video} />  
     
    ) : (
       article.sharedImg && <img src={article.sharedImg} />
     )}
     </a>
    </SharedImg>
    <SocialCount>
      <li>
       <button>
       <spam>56</spam> 
         <img src="/images/like.png" alt="" />
         <img src="/images/dislike.png" alt="" />
        
       </button>
      </li>
      <li><a> 
       {article.comments}
      </a></li>
    </SocialCount>
    <SocialAction>
    <button> 
         <img  src="/images/like.png" alt="" />
         <spam>like</spam>
       </button>
       <button> 
         <img src="/images/dislike.png" alt="" />
         <spam>Dislike</spam>
       </button>
       <button> 
       
         <a href="whatsapp://send?text=This is WhatsApp sharing example using link" 		data-action="share/whatsapp/share"
		target="_blank"> <img  src="/images/share.png" alt="" /> </a> 
    <a href="whatsapp://send?text=This is WhatsApp sharing example using link" 		data-action="share/whatsapp/share"
		target="_blank"> Share </a>  
       </button>
       </SocialAction>
    </Article>
    ))}
    </Content>
  <PostModal showModal={showModal} handleClick={handleClick} />
  </Container>
  )}
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;


const CommonCard = styled.div`
 text-align: center;
 overflow: hidden;
 margin-bottom: 8px;
 background-color: #fff;
 border-radius:5px;
 possition:relative;
 border:none;
 box-shadow: 0 0 0 1px rgba(0 0 0 / 15%), 0 0 0 1px rgba(0 0 / 20%);
`;

 const ShareBox= styled(CommonCard)`
 diaply:flex;
 flex-direction: column;
 color: #958b7b;
 margin: 0 0 8px;
 background: white;

  div {
      button{
       outline: none;
       color: rgba(0, 0, 0, 0.6);
       font-size:14px;
       line-height: 1.5;
       min-height: 48px;
       background: transparent;
       border: none;
       display:flex;
       align-items: center;
       font-weight: 600;

     }
     &:first-child {
       display: flex;
       align-items: center;
       padding: 8px 16px 0px 16px;
       img {
         width:48px;
         border-radius:50%;
         margin-right: 8px;
       }
       button{
         margin:4px 0 0 0;
         flex-grow:1;
         border-radius: 35px;
         padding-left:16;
         border: 1px solid rgba(0, 0, 0, 0.15);
         background-color:white;
         text-align:left;
       }
     }
     &:nth-child(2){
       display: flex;
       flex-wrap:wrap;
       justify-content:space-around;
       padding-bottom:4px;
       padding-top:4px;
       

       button{
         img{
           margin: 0 4px 0 -2px;
           width:25px;
           height:25px;
           
         }
       }
     }
  }
 
 `;

 const Article = styled(CommonCard)`
  padding:0;
  margin: 0 0 8px 0;
  overflow:visible;
 `;

 const SharedActor = styled.div`
  paddinh-right=40px;
  flex-wrap:nowrap;
  padding:12px 16px 0;
  margin-bottom:8px;
  align-items:center;
  display:flex;
  a{
    margin-right:12px;
    flex-grow:1;
    overflow:hidden;
    display:flex;
    text-decoration:none;

    img{
      width:48px;
      height:48px;
    }
    & > div{
      display:flex;
      flex-direction:column;
      flex-grow:1;
      flex-basis:0;
      margin-left:8px;
      overflow:hidden;

      span{
        text-align:left;
        &:first-child{
          font-size:14px;
          font-weight:700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n +1){
           font-size:12px;
           color: rgba(0, 0, 0, 0.6);
        }

      }
    }
  }

  button{
    possition:absolute;
    right: 12px;
    top:0;
    background:transparent;
    border:none;
    outline: none;
    

    img{
      width:20px;
      height:20px;
      padding-bottom: 20px;
      
    }
  }
 `;

 const Discription = styled.div`
 padding: 0 16px;
 overflow:hidden;
 color: rgba(0, 0, 0, 0.9);
 font-size:14px;
 text-align:left;
 `;

 const SharedImg= styled.div`
  margin-top:8px;
  width:100%;
  display:block;
  position:relative;
  background-color:#f9fafb;

  img{
    object-fit:contain;
    width: auto;
    height:400px;
    

  }
 `;

 const SocialCount = styled.ul`
 line-height:1.3;
 display:flex;
 align-items:flex-start;
 overflow:auto;
 margin:0 16px;
 padding:8px 0;
 border-bottom:1px solid #e9e5df;
 list-style:none;
 Button{
   align-items:center;
   background-color:transparent;
   border: none;
 }

 li{
   margin-right:5px;
   font-size:12px;
   button{
     display:flex;
   }
   img{
     width:25px;
   }
 }
 `;

 const SocialAction = styled.div`
  align-items:center;
  display:flex;
  justify-content:space-between;
  margin:0;
  min-height:40px;
  padding:4px 70px 8px 9px;
  

  button{
    display:inline-flex;
    align-items:center;
    color: #0a66c2;
    width:50px;
    height: 50px;
    background-color:transparent;
    border:none;
    
    img{
      width:50px;
      height:50px;
    }

    @media(min-width:768px){
      span{
        margin-left:8px;
      }
      a{
        margin-left:8px;
      }
    }
  }

 `;
 const Content = styled.div`
 text-align:center;
 &>img {
   width:30px;
 }
 `;

 const mapStateToProps = (state) =>{
   return{
     loading: state.articleState.loading,
     user: state.userState.user,
     articles:state.articleState.articles,
   };
 };

 const mapDispatchToProps = (dispatch) =>({
   getArticles: () => dispatch(getArticlesAPI()),
 });


export default connect(mapStateToProps, mapDispatchToProps)(Main);

