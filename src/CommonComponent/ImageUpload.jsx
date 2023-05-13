import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 375,
    width:"100%",
    marginLeft: theme.spacing(2.6),
    marginTop:theme.spacing(1)
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  input: {
    display: "none",
  },
}));

export default function ImageUpload({uploadText,key}) {
  const classes = useStyles();
  const [image, setImage] = useState(null);

  const handleFileSelect = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };
console.log(key,uploadText);
  return (
      <div className="">
    <Card className={classes.root} key={uploadText}>
      <CardMedia className={classes.media} image={image} title="Preview" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
         {uploadText}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Click the button below to select an image for upload.
        </Typography>
        <input
          accept="image/*"
          className={classes.input}
          id={`image-upload-button-${uploadText}`}
          type="file"
          onChange={handleFileSelect}
        />
        <label htmlFor={`image-upload-button-${uploadText}`}>
          <Button variant="contained" color="primary" component="span">
            Select Image
          </Button>
        </label>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" disabled={!image}>
          Upload
        </Button>
      </CardActions>
    </Card>
    </div>
  );
}
