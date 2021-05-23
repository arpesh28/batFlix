import React, { useEffect, useState } from "react";
import { Row, Container, Col,Navbar,Modal, Button  } from "react-bootstrap";
import {Link, NavLink} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import ReactPlayer from 'react-player'
import './Trailer.css'

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getvideosSuccess } from '../../store/moviesStore';
import { getVideos } from '../../api/Api';

function Trailer ({
  showModal,
  onclose,
  setShowModal,
  id
}) {
  const dispatch = useDispatch();
  const { videos } = useSelector((state) => {
    return state.movie;
  });
  useEffect(async () => {
    const videos = await getVideos({id});
    dispatch(getvideosSuccess(videos));
  }, []);
  console.log('Videos',videos)
  const trailer = videos&&videos.results&&videos.results.find((item)=>{
   return item.type=='Trailer'
  })
  console.log(trailer)
  const history = useHistory();
    return (
      <Modal
      show={showModal}
      onHide={onclose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ReactPlayer url={`https://www.youtube.com/watch?v=${trailer&&trailer.key}&t=${trailer&&trailer.key}`} />

    </Modal>
    )
}

export default Trailer