import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Skeleton,
  Typography,
  Grid,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useEffect, useState } from "react";
import { MingleCacheService } from "./utility/CacheService";
import { MingleGroupDto, MingleUserDto } from "@/protos/protos/mingle_pb";

export const DashBoardPage = () => {
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [mingleUserDto, setMingleUserDto] = useState<MingleUserDto | null>(null); // Initialize user state

  useEffect(() => {
    // Fetch data from MingleCacheService
    const fetchData = () => {
      const userDto = MingleCacheService.get(); // Retrieve user data from cache
      setMingleUserDto(userDto);
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  if (!mingleUserDto) {
    return <Typography variant="h6">No user data available.</Typography>;
  }

  return (
    <Grid container spacing={2} sx={{ padding: 1 }}>
      {mingleUserDto.getMinglegroupdtoList().map((group, index) => (
        <Grid  size={{ xs:12, sm: 6, md:4}} key={index}>
          <GroupDashBoard group={group} loading={loading} />
        </Grid>
      ))}
    </Grid>
  );
};

const GroupDashBoard = ({
  group,
  loading,
}: {
  group: MingleGroupDto;
  loading: boolean;
}) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
          ) : (
            <Avatar
              alt={group.getGroupname()}
              src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
            />
          )
        }
        action={
          loading ? null : (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
          loading ? (
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
          ) : (
            group.getGroupname() +" | "+ group.getZip()|| "Group Name"
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            "Last updated: 5 hours ago"
          )
        }
      />
      {loading ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          component="img"
          height="140"
          image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
          alt="Group Image"
        />
      )}
      <CardContent>
        {loading ? (
          <>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {group.getDescription() ||
              "This is a placeholder description for the group."}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

