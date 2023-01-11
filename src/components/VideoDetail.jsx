import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import { Videos } from './';
import { fetchFromApi } from '../utils/fetchFromApi';

const VideoDetail = () => {

  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {

    fetchFromApi(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]));

    fetchFromApi(`search?part=snippet`)
      .then((data) => setVideos(data.items));
  }, [id]);

  if (!videoDetail?.snippet) return 'Loading...';

  const { snippet: { title, channelId, channelTitle }, statistics: {
    viewCount, likeCount
  } } = videoDetail;
  
  return (
    <Box minHeight='95vh'>
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
            <ReactPlayer className="react-player"
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
            />
            <Typography variant='h5' color='#fff' fontWeight='bold'>
              {title}
            </Typography>
            <Stack direction='row' py={1} px={2} justifyContent='space-between' sx={{
              color: '#fff'
            }}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: 'subtitle1', md: 'h6', }} color='gray'>
                  {channelTitle}
                  <CheckCircle sx={{ fontSize: 14, color: 'gray', ml: '5px' }} />
                </Typography>
              </Link>
              <Stack direction='row' gap='20px' alignItems='center'>
                <Typography variant='subtitle1' color='gray'>{parseInt(likeCount).toLocaleString()}views</Typography>
                <Typography variant='subtitle1' color='gray'>{parseInt(viewCount).toLocaleString()}views</Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Stack>
      <Box px={2} py={{ md: 1, xs: 5 }} justifyContent='center' alignItems='center'>
        <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default VideoDetail