import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import logo from './logo.svg';
import image from './image.png'


export default function Id() {
  return (
    <div>
    <center>
        <div> <Card sx={{ maxWidth: 500, minHeight: 600, margin: 8, border: '5px outset aqua', borderRadius: 5, backgroundRepeat: "no-repeat", height: "100%", width: "300%", backgroundSize:"200%" }}>
            <center>
                <CardMedia sx={{ maxWidth: 250, borderRadius: 150, border: '5px inset aqua', margin: 4, marginLeft: 5 }}
                    component="img"
                    height="250"
                    image={image}
                />
            </center>
            <CardContent>
                <Typography color="black" gutterBottom variant="h3" component="div" fontFamily={'serif'}>
                   Manoj Bharadwaja.T<br></br>
                </Typography>
                <Typography color="Red" gutterBottom variant="h3" component="div" fontFamily={'serif'}> 2100031298
                </Typography>
                <Typography variant="body2" color="Black">
                    <b><p>Cloud Engineer</p>
                    <p>CSE Department, KL University</p>
                    <p>Vijayawada</p></b>
                </Typography>
            </CardContent>
        </Card></div>
    </center>
</div>
  );
}