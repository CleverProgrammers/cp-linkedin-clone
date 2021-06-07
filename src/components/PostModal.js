import styled from "styled-components";
import {useState} from "react";
import ReactPlayer from "react-player";
import {connect } from "react-redux";
import firebase from "firebase";
import {postArticleAPI} from "../actions";


const PostModal =(props) =>{
    const [editorText, setEditorText] = useState("");
    const [shareImage, setShareImage] = useState("");
    const [videoLink,setVideoLink] = useState("");
    const [assetArea, setAssetArea] = useState("");

    const handleChange= (e) =>{
      const image = e.target.files[0];
      if(image === '' || image === undefined){
        alert('not an image ,the file is a ${typeof image}')
        return;
      }
      setShareImage(image);
    };
    const switchAssetArea= (area) =>{
      setShareImage("");
      setVideoLink("");
      setAssetArea(area);
    };

    const postArticle=(e) =>{
      e.preventDefault();
      if(e.target !== e.currentTarget){
        return;
      }
      const payload ={
        image:shareImage,
        video:videoLink,
        user: props.user,
        description:editorText,
        timestamp: firebase.firestore.Timestamp.now(),

      };
      props.postArticle(payload);
      reset(e);
    };

    const reset= (e) =>{
        setEditorText("");
        setShareImage("");
        setVideoLink("");
        setAssetArea("");
        props.handleClick(e);
    };

    return(
      <> 
      { props.showModal === 'open' && (
     <Container>
      <Content className="content">
      <Header>
        <h2>Create post</h2>
        <button onClick={(event)=> reset(event)}>
          <img src="/images/close-icon.svg" alt="" />
        </button>
      </Header>
       <ShareContent>
        <UserInfo>
        { props.user.photoURL ? (
          <img src={props.user.photoURL}/>
         ):(
           <img src="/images/user.svg" alt="" />
           )}
         <span>{props.user.displayName}</span>
        </UserInfo>
        <Editor>
          <textarea value={editorText} onChange={(e) => setEditorText(e.target.value)}
          placeholder="What do you want to talk about?" autoFocus={true}></textarea>
          { assetArea === "image" ? (
          <UploadImage>
          <input type="file"
          accept="image/gif, image/png, image/jpeg, image/png"
          name="image"
          id="file"
          onChange= {handleChange}
           />
           <p><label htmlfor="file">Select an image to share</label></p>
             {shareImage && <img src={URL.createObjectURL(shareImage)} />}
             </UploadImage>
           ):(
           
           assetArea === "media" && (

             <> <input type="text" 
             placeholder="Please input a video link"
             value={videoLink}
             onChange={(e) => setVideoLink(e.target.value)} />
             {videoLink &&(<ReactPlayer width={"auto"} url={videoLink} />
              )}
             </>))
           }
            
          </Editor>
       </ShareContent>
       <ShareCreation><AttachAssets>
         <AssetButton onClick={() => switchAssetArea("image")} >
           <img src="/images/photo-icon.svg" alt="" />
         </AssetButton>
         <AssetButton onClick={() => switchAssetArea("media")}>
           <img src="/images/video-icon.svg" alt="" />
         </AssetButton>
       </AttachAssets>
       <ShareComment>
       <AssetButton>
        <img src="/images/share-comment.svg" alt="" />
        Anyone
       </AssetButton>
       </ShareComment>
       <PostButton disabled={!editorText ? true : false} onClick={(event) =>postArticle(event)}>Post</PostButton>
       </ShareCreation>
      </Content>
    </Container>
      )} </>
    );
};

const Container = styled.div`
 position :fixed ;
 top:0;
 left:0;
 right:0;
 bottom:0;
 z-index:9999;
 color: black;
 background-color: rgba(0,0,0,0.8);
 animation: fadeIn 0.3s;
 

`;
const Content = styled.div`
  width:100%;
  max-width:552px;
  background-color:white;
  max-height: 90%;
  overflow:initial;
  border-radius:5px;
  position:relative;
  flex-direction:column;
  top:32px;
  margin:0 auto;
  overflow-y: scroll;
`;


const Header = styled.div`
  display:block;
  padding:16px 20px;
  border-bottom:1px solid rgba(0,0,0,0.15);
  font-size:16px;
  line-height:1.5;
  color:rgba(0,0,0,0.6);
  font-weight:400;
  display:flex;
  justify-content:space-between;
  align-items:center;
  button{
    height:40px;
    width:40px;
    min-height:auto;
    color:rgba(0,0,0,0.15);
    svg,
    img {
        pointer-events:none;
    }
  }
`;

const ShareContent = styled.div`
display:flex;
flex-direction: column;
flex-grow:1;
overflow-y:auto;
vartical-align:baseline;
padding:8px 12px;
background:transparent;
`;
const UserInfo = styled.div`
display: flex;
align-items:center;
padding:12px 24px;
svg,img{
    width:48px;
    height:48px;
    background-clip:content-box;
    border:2px solid transparent;
    border-radius:50%;
}
span{
    font-weight:600;
    font-size:16px;
    line-height:1.5;
    margin-left:5px;
}
`;

const ShareCreation = styled.div`
 display:flex;
 justify-content:space-between;
 padding:12px 24px 12px 16px;
`;
const AssetButton = styled.div`
 display: flex;
 align-items:center;
 height:40px;
 min-width:auto;
 color: rgba(0, 0, 0,0.5);
 
`;

const AttachAssets=styled.div`
 align-items: center;
 display:flex;
 padding-right:8px;
 ${AssetButton} {
     width:50px;
 }

`;
const ShareComment=styled.div`
 padding-left:8px;
 margin-right:auto;
 border-left:1px solid rgba(0,0,0,0.15);
 
 ${AssetButton} {
    margin-right: 5px;
}
`;
const PostButton=styled.div`
 min-width:60px;
 border:2px solid rgba(0,0,0,0.15);
 border-radius:20px;
 padding-left:16px;
 padding-right: 16px;
 background: ${(props)=> (props.disabled ? "rgba(0,0,0,0.8)" :"#0a66c2")};
 text-align:center;
 padding-top:10px;
 color: ${(props)=> (props.disabled ? "rgba(1,1,0,0.4)" :"White")};
 &:hover{
     background:  ${(props)=> (props.disabled ? "rgba(0,0,0,0.08)" :"#004182")};
 }
`;

const Editor = styled.div`
padding:12px 24px;
textarea{
    width:100%;
    min-height:100px;
    resize:nome;
}
input{
    width:100%;
    height:35px;
    font-size:16px;
    margin-bottom:20px;
}
`;

const UploadImage = styled.div`
text-align:center;
img{
  width:auto;
  height:250px;
}
`;
const mapStateToProps= (state) =>{
  return{
    user: state.userState.user,
  }
};

const mapDispatchToProps=(dispatch) =>({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);