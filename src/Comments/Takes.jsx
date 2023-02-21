import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { axiosGet, axiosTMDBGet } from '../hooks/useAxios';
import Take from './Take';
import Comment from './Comment';

import './Comments.css';

const Takes = ({
    auth
}) => {
    const [replyToOpen, setReplyToOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [logo, setLogo] = useState("");
    const [currentId, setCurrentId] = useState("0");
    const navigate = useNavigate();
    const { mediatype, itemid } = useParams();

    useEffect(() => {
        setReplyToOpen(false);
        axiosGet(`comment/thread/${itemid}`).then((response) => {
            console.log(response);
            setComments(response.data);
        });
        axiosTMDBGet(`${mediatype}/${itemid}/images`).then((response) => {
            setLogo(response?.data?.logos[0]?.file_path);
        });
    }, []);

    useEffect(() => {
        console.log(currentId);
    }, [currentId]);

    useEffect(() => {
        console.log(comments);
    }, [comments]);

    const handleOnReplyButton = (e) => {
        console.log(itemid);
        console.log(replyToOpen);
        setReplyToOpen(true);
    }

    const updateCurrentId = () => {
        for (let i = 0; i < currentId.length; i += 2) {
            let indexChar = parseInt(currentId.charAt(i));
            console.log(indexChar);

        }
        let finalDigit = parseInt(currentId.charAt(currentId.length - 1)) + 1;
        
        let returnVal = currentId.substring(0, currentId.length - 1) + finalDigit;
        setCurrentId(returnVal);
    }

    return (
        <div>
            <button 
                className="btn-close"
                onClick={() => navigate('/')}
            />
            <h4 className='comments-header'>Comments: </h4>
            <img
                style={{width: '100%'}}
                src={`https://image.tmdb.org/t/p/original/${logo}`}
            />
            <hr />
            {comments.length === 0 ?
                <button
                    onClick={handleOnReplyButton}
                >
                    Be the first to comment!
                </button>
                :
                <React.Fragment>
                    {
                        comments.map((comment) => 
                            <Comment
                                key="{comment}"
                                username={auth.username}
                                commentText={comment.commentText}
                                onReplyButton={handleOnReplyButton}
                                itemid={itemid}
                                currentId={currentId}
                                handleSetCurrentId={updateCurrentId}
                            />
                        )
                    }
                </React.Fragment>
            }
            <hr />
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Takes);