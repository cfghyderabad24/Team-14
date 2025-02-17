import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {
  const [users, setUsers] = useState([]);
  const [sch, setSch] = useState([]);
  const [renewalRequests, setRenewalRequests] = useState([]);

  useEffect(() => {
    // Fetch Users
    fetch('http://localhost:8000/api/users/')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));

      fetch('http://localhost:8000/api/scholarshipRequests/')
      .then((response) => response.json())
      .then((data) => setSch(data))
      .catch((error) => console.error('Error fetching users:', error));

    // Fetch Renewal Requests
    fetch('http://localhost:8000/api/renewal')
      .then((response) => response.json())
      .then((data) => setRenewalRequests(data))
      .catch((error) => console.error('Error fetching renewal requests:', error));
  }, []);

  const calculateStatistics = () => {
    const totalAmountAwarded = renewalRequests.reduce((sum, req) => sum + req.amount, 0);
    const ngoCount = users.filter((user) => user.role === 'NGO').length;
    const volunteerCount = users.filter((user) => user.role === 'volunteer').length;
    const studentCount = users.filter((user) => user.role === 'student').length;
    const totalRenewalRequests = renewalRequests.length;

    const approvedByTrusteeCount = renewalRequests.filter((req) =>
      req.approvedBy.includes('trustee')
    ).length;
    const notApprovedByTrusteeCount = renewalRequests.filter(
      (req) => !req.approvedBy.includes('trustee')
    ).length;

    const courseCounts = sch.reduce((acc, req) => {
      if (!acc[req.course]) {
        acc[req.course] = 0;
      }
      acc[req.course] += 1;
      return acc;
    }, {});

    return {
      totalAmountAwarded,
      ngoCount,
      volunteerCount,
      approvedByTrusteeCount,
      notApprovedByTrusteeCount,
      courseCounts,
      studentCount,
      totalRenewalRequests,
    };
  };

  const stats = calculateStatistics();

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Students"
            total={stats.studentCount}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Amount Awarded"
            total={stats.totalAmountAwarded}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_currency.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="No of NGO's"
            total={stats.ngoCount}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_ngo.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="No of volunteer's"
            total={stats.volunteerCount}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_voulnteer.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Number of Student's summary!"
            subheader="since 2024"
            chart={{
              labels: ['2021', '2022', '2023', '2024'],
              series: [
                {
                  name: 'New Students',
                  type: 'column',
                  fill: 'solid',
                  data: [0, 0, 0, stats.studentCount],
                },
                {
                  name: 'Renewals',
                  type: 'area',
                  fill: 'gradient',
                  data: [0, 0, 0, 0],
                },
                {
                  name: 'Total',
                  type: 'area',
                  fill: 'gradient',
                  data: [0, 0, 0, stats.studentCount],
                },
              ],
            }}
          />
        </Grid>


        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Course wise Scholarship"
            subheader="Year 23-24"
            chart={{
              series: [
                { label: 'Engineering', value: stats.courseCounts.Engineering || 0 },
                { label: 'MBBS', value: stats.courseCounts.MBBS || 0 },
                { label: 'BBA', value: stats.courseCounts.BBA || 0 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Approved Requests"
            subheader="Year 24-25"
            chart={{
              series: [
                { label: 'Approved', value: stats.approvedByTrusteeCount },
                { label: 'Not Approved', value: stats.notApprovedByTrusteeCount },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Daily Attendace summary!"
            subheader="since 2024"
            chart={{
              labels: [
                '1/1/2024',
                '1/2/2024',
                '1/3/2024',
                '1/4/2024',
                '1/5/2024',
                '1/6/2024',
                '1/7/2024',
                '1/8/2024',
                '1/9/2024',
              ],
              series: [
                {
                  name: 'Total Classes',
                  type: 'column',
                  fill: 'solid',
                  data: [8, 10, 4, 83, 78, 53, 74, 76, 111],
                },
                {
                  name: 'Attended Classes',
                  type: 'area',
                  fill: 'gradient',
                  data: [0, 6, 12, 9, 46, 82, 66, 54, 70],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={12}>
          <AppConversionRates
            title="Year wise Scholarship"
            subheader="(+37.4%) than last year"
            chart={{
              series: [
                { label: '2020-21', value: 0 },
                { label: '2021-22', value: 0 },
                { label: '2022-23', value: 0 },
                { label: '2023-24', value: 18 },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
