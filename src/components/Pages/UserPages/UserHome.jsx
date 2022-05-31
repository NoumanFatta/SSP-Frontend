import React from 'react'
import { Box } from '@mui/material';



const UserHome = () => {


  return (
    <Box width={'100%'} >
      <iframe
        title='myFrame'
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fweb.facebook.com%2FSaylaniMassTraining%2Fvideos%2F%3Fref%3Dpage_internal&tabs=timeline&width=474&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
        width="100%"
        height="500"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </Box>

  )
}

export default UserHome