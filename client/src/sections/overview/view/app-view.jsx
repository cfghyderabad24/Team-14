// import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import Iconify from 'src/components/iconify';

// import AppTasks from '../app-tasks';
// import AppNewsUpdate from '../app-news-update';
// import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
// import AppTrafficBySite from '../app-traffic-by-site';
// import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Students"
            total={497}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Schorlarship Amount"
            total={11087324}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="No of NGO's"
            total={181}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="No of volunteer's"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Number of Student's summary!"
            subheader="since 2016"
            chart={{
              labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
              series: [
                {
                  name: 'New Students',
                  type: 'column',
                  fill: 'solid',
                  data: [8, 10, 4, 83, 78, 53, 74, 76, 111],
                },
                {
                  name: 'Renewals',
                  type: 'area',
                  fill: 'gradient',
                  data: [0, 6, 12, 9, 46, 82, 66, 54, 70],
                },
                {
                  name: 'Total',
                  type: 'area',
                  fill: 'gradient',
                  data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
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
                { label: 'Engineering', value: 51 },
                { label: 'BSC', value: 29 },
                { label: 'BBA', value: 18 },
                { label: 'nURSING', value: 13 },
                { label: 'oTHERS', value: 19 },
                { label: 'Diploma / ITI', value: 12 },
                { label: 'BCA', value: 12 },
                { label: 'Pharmacy', value: 8 },
                { label: 'MBBS', value: 4 },
                { label: 'Commerce', value: 4 },
                { label: 'Physiotherapy', value: 3 },
                { label: 'BCS', value: 3 },
                { label: 'Architecture', value: 3 },
                { label: 'Law', value: 2 },
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
                { label: 'Engineering', value: 51 },
                { label: 'BSC', value: 29 },
                { label: 'BBA', value: 18 },
                { label: 'nURSING', value: 13 },
                { label: 'oTHERS', value: 19 },
                { label: 'Diploma / ITI', value: 12 },
                { label: 'BCA', value: 12 },
                { label: 'Pharmacy', value: 8 },
                { label: 'MBBS', value: 4 },
                { label: 'Commerce', value: 4 },
                { label: 'Physiotherapy', value: 3 },
                { label: 'BCS', value: 3 },
                { label: 'Architecture', value: 3 },
                { label: 'Law', value: 2 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Daily Attendace summary!"
            subheader="since 2016"
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

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Scholarship Approvals"
            subheader="Year 23-24"
            chart={{
              series: [
                { label: 'Approved', value: 40 },
                { label: 'Not Approved', value: 29 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Year wise Scholarship"
            subheader="(+37.4%) than last year"
            chart={{
              series: [
                { label: '2015-16', value: 8 },
                { label: '2016-17', value: 16 },
                { label: '2017-18', value: 16 },
                { label: '2018-19', value: 91 },
                { label: '2019-20', value: 124 },
                { label: '2020-21', value: 135 },
                { label: '2021-22', value: 140 },
                { label: '2022-23', value: 130 },
                { label: '2023-24', value: 181 },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Year wise progress"
            subheader=""
            chart={{
              labels: ['2016', '2017', '2018', '2019'],
              series: [
                {
                  name: 'Mbbs',
                  type: 'column',
                  fill: 'solid',
                  data: [53, 74, 76, 91],
                },
              ],
            }}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: /assets/images/covers/cover_${index + 1}.jpg,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: order${index + 1},
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}