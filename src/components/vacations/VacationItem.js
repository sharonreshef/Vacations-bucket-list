import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addFollow, removeFollow } from '../../actions/vacation';
// Matirial UI
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Spinner from '../layout/Spinner';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const VacationItem = ({
  auth: { isAuthenticated, loading, user },
  vacationsFollowedByUser,
  addFollow,
  removeFollow,
  vacation: {
    id,
    vacationDescription,
    image,
    startingDate,
    endingDate,
    price,
    followers
  }
}) => {
  let isFollowed;
  if (vacationsFollowedByUser.find(vacation => vacation.id === id)) {
    isFollowed = true;
  }
  const classes = useStyles();
  console.log(isFollowed);
  return (
    <Fragment>
      <Card className={classes.card}>
        <CardHeader>{vacationDescription}</CardHeader>
        <CardMedia
          className={classes.media}
          image={image}
          title='Paella dish'
        />
        <CardContent>
          {!loading && user.isAdmin && (
            <div>
              <button>Delete</button>
              <button>Edit</button>
            </div>
          )}
          <Typography variant='body2' color='textSecondary' component='p'>
            <p>
              Starts on: <Moment format='DD/MM/YYYY'>{startingDate}</Moment>
            </p>
            <p>
              Ends on: <Moment format='DD/MM/YYYY'>{endingDate}</Moment>
            </p>
            <p>Price: {price}$</p>
            {!loading && !user.isAdmin && (
              <button
                onClick={e => {
                  isFollowed ? removeFollow(id) : addFollow(id);
                }}
              >
                {isFollowed ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </Typography>
        </CardContent>
      </Card>
    </Fragment>
  );
};

VacationItem.propTypes = {
  vacation: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addFollow: PropTypes.func.isRequired,
  removeFollow: PropTypes.func.isRequired,
  vacationsFollowedByUser: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  vacationsFollowedByUser: state.vacation.vacationsFollowedByUser
});

export default connect(
  mapStateToProps,
  { addFollow, removeFollow }
)(VacationItem);
