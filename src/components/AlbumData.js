import React, { useState } from "react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Grid, Container, Typography, Input } from "@material-ui/core";

import { getAlbum } from "../reducers/albumReducer";

export default function AlbumData() {
  const dispatch = useDispatch();
  const { album } = useSelector((state) => state);
  const [albumData, setAlbumData] = useState(album);

  useEffect(() => {
    dispatch(getAlbum());
  }, [dispatch]);
  console.log(album);
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing="2">
          <Grid item xs={12}>
            <Input
              id="input-with-icon-adornment"
              style={{
                border: "1px solid #e8edf4",
                background: "#EEE5FF",
                borderBottom: "1px solid #e8edf4",
                boxSizing: "border-box",
                borderRadius: "8px",
                outline: "none",
                width: "100%",
                marginTop: "20px",
                height: "40px",
                paddingLeft: "20px",
              }}
              disableUnderline={true}
              placeholder="See your financial reports"
            />
          </Grid>

          {album.albumData.map((_data) => {
            return (
              <>
                <Grid item xs={12} key={_data.albumData.id}>
                  <Typography variant="h4">{_data.albumData.title}</Typography>
                </Grid>
                {_data.photosData.map((_photosData) => {
                  return (
                    <Grid item xs={12} key={_photosData.id}>
                      <Grid container>
                        <Grid item style={{ marginRight: "15px" }}>
                          <img
                            src={_photosData.thumbnailUrl}
                            alt={_photosData.title}
                            style={{ height: "50px", width: "50px" }}
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography variant="body1">
                                {_photosData.title}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <a
                                style={{ color: "gray" }}
                                href={_photosData.url}
                              >
                                {_photosData.url}
                              </a>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={1}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography
                                variant="body1"
                                style={
                                  _photosData.amount > 75 ||
                                  _photosData.amount > "75"
                                    ? { color: "green" }
                                    : { color: "red" }
                                }
                              >
                                $ {_photosData.amount}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="body1">10:09AM</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
              </>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
