import { Divider, Fab, IconButton, makeStyles } from "@material-ui/core";
import React from "react";
import { Drawer, Typography } from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { AccountCircle, AddCircleOutlined, KeyboardArrowUp, SubjectOutlined } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router";
import { AppBar, Toolbar } from "@material-ui/core";
import { format } from "date-fns";
import { blue } from "@material-ui/core/colors";
import { Zoom } from "@material-ui/core";
import { useScrollTrigger } from "@material-ui/core";
import { useState } from "react";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Tooltip } from "@material-ui/core";

const drawerWidth = 200

const useStyles = makeStyles((theme) => {
    return{
        root:{
            display:'flex'
        },
        app:{
           width: `calc(100% - ${drawerWidth}px)`
        },
        pages:{
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },
        drawer:{
            width: drawerWidth
        },
        drawerPaper:{
            width: drawerWidth
        },
        active:{
            background: '#f4f4f4'
        },
        title:{
            padding: theme.spacing(2)
        },
        toolbar: theme.mixins.toolbar,
        date:{
            flexGrow: 1
        },
        avatar:{
            marginLeft: theme.spacing(2),
            backgroundColor: blue[500]
        },
        backToTop:{
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        footer:{
            position: "fixed",
            bottom: 0,
            width: drawerWidth
        }
    }
})

function ScrollTop({children}) {
    const classes = useStyles();
    const trigger = useScrollTrigger();
  
    const handleClick = () => {
        window[`scrollTo`]({ top: 0, behavior: `smooth` })
    };
  
    return (
      <Zoom in={trigger}>
        <div onClick={handleClick} role="presentation" className={classes.backToTop}>
          {children}
        </div>
      </Zoom>
    );
  }

const Layout = ({ children }) => {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()

    const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () =>{
    setAnchorEl(null);
    history.push('/profile')
  }

    const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          id="profile-menu"
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick = { handleProfileClick }>My Profile</MenuItem>
        </Menu>
      );

    const menuItems = [
        {
            text: 'My notes',
            icon: <SubjectOutlined color="secondary" />,
            path: '/'
        },
        {
            text: 'Create note',
            icon: <AddCircleOutlined color="secondary" />,
            path: '/create'
        }
    ]

    return (
        <>
        <div className={classes.root}>
            <AppBar className = {  classes.app } elevation = {0}>
                <Toolbar>
                    <Typography className = { classes.date }>
                        Today is the { format(new Date(), `do MMMM Y`)}
                    </Typography>
                    <Typography>
                        Sanith
                    </Typography>
                    <Tooltip title="Profile">
                        <IconButton
                            edge="end"
                            aria-controls="profile-menu"
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            >
                            <AccountCircle />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            {renderMenu}
            <Drawer
                className= { classes.drawer }
                variant = "permanent"
                anchor = "left"
                classes = {{ paper: classes.drawerPaper }}
            >
                <div>
                    <Typography variant="h5" className = { classes.title }>
                        Daily Day Notes
                    </Typography>
                </div>
                
                <List>
                    { menuItems.map(item => (
                        <ListItem 
                        className = { location.pathname == item.path ? classes.active : null }
                        button
                        key = {item.text}
                        onClick = {() => history.push(item.path) }
                        >
                            <ListItemIcon>{ item.icon }</ListItemIcon>
                            <ListItemText primary={ item.text } />
                        </ListItem>
                    ))}
                    
                    <ListItem button className={classes.footer}>
                        <ListItemText primary="Contact Us" />
                    </ListItem>
                </List>
            </Drawer>
            <div className= {classes.pages}>
                <div className= {classes.toolbar} />
                    {children}
            </div>
            <ScrollTop >
                <Tooltip title = "Top">
                    <Fab color="secondary" size="small" aria-label="scroll back to top">
                        <KeyboardArrowUp />
                    </Fab>
                </Tooltip>
            </ScrollTop>
        </div> 
        </>
     );
}
 
export default Layout;