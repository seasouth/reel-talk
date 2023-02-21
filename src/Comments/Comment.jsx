import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Take from './Take';

import './Comments.css';

const Comment = ({
    auth,
    username,
    commentText,
    itemid,
    currentId,
    handleSetCurrentId
}) => {
    const [replyToOpen, setReplyToOpen] = useState(false);

    const handleOnClick = (e) => {
        console.log(e);
        setReplyToOpen(true);
    }

    const handleOnReplyButton = (e) => {
        setReplyToOpen(true);
    }

    return (
        <div className='comment'>
            <div className='comment-inner'>
                <div className='comment-author'>
                    {username}
                </div>
                <div className='comment-text'>
                    {commentText}
                </div>
                <div className='comment-menu'>
                    <div 
                        style={{padding: '2px'}} 
                    >
                        <button
                            className='btn btn-outline-light btn-sm'
                        >
                            Rate
                        </button>
                    </div>
                    <br />
                    <div 
                        style={{padding: '2px'}} 
                    >
                        <button
                            className='btn btn-outline-light btn-sm'
                            onClick={handleOnClick}
                        >
                            Reply
                        </button>
                    </div>
                </div>
            </div>
            <Take
                username={auth.username}
                openReply={replyToOpen}
                itemId={itemid}
                currentId={currentId}
                handleSetCurrentId={handleSetCurrentId}
                handleOnReplyButton={handleOnReplyButton}
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Comment);