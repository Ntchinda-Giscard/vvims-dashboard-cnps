import { Group, Paper, Text, ThemeIcon, SimpleGrid } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import classes from './StatsGridIcons.module.css';
import { useSubscription } from '@apollo/client';
import { TODAYS_APP, GET_COMPLETED_APP, UPCOMING_APPOINMENT } from '../query/query';
import { useEffect } from 'react';
import { GET_MONTH_LEAVE } from '../../leave/queries/queries';


export default function StatsGridIcons() {
  const {data: dataToday } = useSubscription(TODAYS_APP);
  const {data: dataCompleted} = useSubscription(GET_COMPLETED_APP);
  const {data: dataUpcoming} = useSubscription(UPCOMING_APPOINMENT);
  

  useEffect(() =>{

  }, [dataToday, dataCompleted, dataUpcoming])
  const data = [
    { title: 'Completed', value: dataToday?.appointments_aggregate?.aggregate?.count, diff: 0 },
    { title: 'Todays ', value: dataCompleted?.appointments_aggregate?.aggregate?.count, diff: -0 },
    { title: 'Upcoming ', value: dataUpcoming?.appointments_aggregate?.aggregate?.count, diff: 0 },
  ];

  const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="apart">
          <div>
            <Text c="dimmed" tt="uppercase" fw={700} fz="xs" className={classes.label}>
              {stat.title}
            </Text>
            <Text c="#404040" fw={700} fz="xl">
              {stat.value}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            style={{
              color: stat.diff > 0 ? 'var(--mantine-color-teal-6)' : 'var(--mantine-color-red-6)',
            }}
            size={38}
            radius="md"
          >
            <DiffIcon size="1.8rem" stroke={1.5} />
          </ThemeIcon>
        </Group>
        <Text c="dimmed" fz="sm" mt="md">
          <Text component="span" c={stat.diff > 0 ? 'teal' : 'red'} fw={700}>
            {stat.diff}%
          </Text>{' '}
          {stat.diff > 0 ? 'increase' : 'decrease'} compared to last month
        </Text>
      </Paper>
    );
  });

  return (
    <div>
      <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>
    </div>
  );
}