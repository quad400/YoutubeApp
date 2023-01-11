import { useState, useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material'
import { Videos, ChannelCard } from './';
import { fetchFromApi } from '../utils/fetchFromApi'

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([])
  useEffect(() => {
    fetchFromApi(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]));

    fetchFromApi(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items));
  }, [id])
  
  return (
    <Box minHeight='95vh'>
      <Box>
        <div style={{
          background: 'linear-gradient(90deg,rgba(69,218,179,1) 41%, rgba(81,163,209,1), 69%, rgba(190,169,230,1) 100%)',
          zIndex: 10,
          height: '300px',
        }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop='-97px' />
      </Box>
      <Box display="flex" p='2'
      >
        <Box backgroundColor='red' sx={{
          mr: { sm: '100px' }
        }} />
        <Videos videos={videos} />

      </Box>
    </Box>
  )
}

export default ChannelDetail