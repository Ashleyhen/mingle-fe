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
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useEffect, useState } from "react";
import { MingleGroupDto, MingleUserDto } from "@/protos/protos/mingle_pb";
import { NavigationProp } from "@react-navigation/native";
import { navigate } from "expo-router/build/global-state/routing";
import MingleGroupInfo, { toMingleGroupInfo } from "./types/MingleGroupInfo";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const GroupDashBoard = ({
  navigation,
  menuActionFuncs,
}: {
  navigation: NavigationProp<any>;
  menuActionFuncs: (mingleGroupInfo:MingleGroupDto)=>MenuActionsFunctions; // Callback to expand the accordion
}) => {
  const [loading, setLoading] = useState(true);
  const mingleUserDto=useSelector((state:RootState) => state.user); ;

  const GroupDashBoardCard = ({
    group,
    loading,
  }: {
    group: MingleGroupDto;
    loading: boolean;
  }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    
    
    const actionFuncs =menuActionFuncs(group);
    setLoading(false); // Simulate loading state

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
              <>
                <IconButton
                  aria-label="settings"
                  aria-controls={open ? "group-menu" : undefined}
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="group-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={actionFuncs.onView}>View</MenuItem>
                  <MenuItem onClick={actionFuncs.onEdit}>Edit</MenuItem>
                  <MenuItem onClick={actionFuncs.onDelete}>Delete</MenuItem>
                </Menu>
              </>
            )
          }
          title={
            loading ? (
              <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 0 }} />
            ) : (
              group.getGroupname() + " | " + group.getZip() || "Group Name"
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

  if (!mingleUserDto) {
    return <Typography variant="h6">No user data available.</Typography>;
  }

  return (
    <Grid container spacing={0} sx={{ padding: 1 }}>
      <Grid  size={{xs:12}}>
        <Typography variant="h6">Your Groups</Typography>
      </Grid>

      {mingleUserDto.getMinglegroupdtoList().map((group, index) => (
        <Grid size={{xs:12,sm:6,md:4}} key={index}>
          <GroupDashBoardCard group={group} loading={loading} />
        </Grid>
      ))}
    </Grid>
  );
};

export default GroupDashBoard;

export type MenuActionsFunctions ={
    onView: () => void;
    onEdit: () => void;
    onDelete: () => void;
  }


