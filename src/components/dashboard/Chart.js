import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVacations } from '../../actions/vacation';

import { Bar } from 'react-chartjs-2';

const Chart = ({ vacations, getVacations }) => {
  useEffect(() => {
    getVacations();
  }, [getVacations]);

  const idArr = vacations.map(({ id }) => id);
  const numOfFollowers = vacations.map(({ followers }) => followers);
  const vacationsDescriptionArr = vacations.map(
    ({ vacationDescription }) => vacationDescription
  );
  console.log(vacations);
  console.log(idArr);
  console.log(numOfFollowers);
  console.log(vacationsDescriptionArr);

  const colors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)'
  ];
  const data = {
    labels: vacationsDescriptionArr,
    datasets: [
      {
        label: 'Follower',
        data: numOfFollowers,
        backgroundColor: (() => {
          let bgcolors = [];
          for (let i = 0; i < vacationsDescriptionArr.length; ++i)
            bgcolors.push(colors[i % colors.length]);
          return bgcolors;
        })()
      }
    ]
  };
  return (
    <div className='chart'>
      <Bar
        data={data}
        options={{
          //   responsive: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  max: 5,
                  stepSize: 1,
                  suggestedMin: 0,
                  suggestedMax: 30
                }
              }
            ]
          },
          title: {
            display: true,
            text: 'Number of Followers'
          },
          tooltips: {
            callbacks: {}
          }
        }}
      />
    </div>
  );
};

Chart.propTypes = {
  vacation: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  vacations: state.vacation.vacations
});

export default connect(
  mapStateToProps,
  { getVacations }
)(Chart);
