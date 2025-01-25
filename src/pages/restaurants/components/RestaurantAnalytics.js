import React from 'react';
import { Modal, Card, Row, Col, Statistic, Divider, Collapse } from 'antd';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart,
  Pie, Cell, LineChart, Line
} from 'recharts';
import {
  StarOutlined,
  TeamOutlined,
  TableOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  UserOutlined,
  ShopOutlined,
  CalendarOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import moment from 'moment';

const COLORS = ['#1890ff', '#52c41a', '#faad14', '#f5222d'];

const RestaurantAnalytics = ({ restaurant, visible, onClose }) => {
  const { text } = useLanguage();

  const workingDays = restaurant?.workHours?.filter(h => !h.isDayOff) || [];
  const averageWorkingHours = workingDays.reduce((acc, day) => {
    const start = new Date(`2000/01/01 ${day.startTime}`);
    const end = new Date(`2000/01/01 ${day.endTime}`);
    return acc + (end - start) / (1000 * 60 * 60);
  }, 0) / workingDays.length;

  const totalCapacity = restaurant?.diningTables?.reduce((acc, table) => acc + table.capacity, 0) || 0;
  const capacityDistribution = restaurant?.diningTables?.reduce((acc, table) => {
    acc[table.capacity] = (acc[table.capacity] || 0) + 1;
    return acc;
  }, {});

  const getFeedbackAnalytics = () => {
    const feedbacks = restaurant?.feedbackList || [];
    return {
      excellent: feedbacks.filter(f => f.rating >= 4.5).length,
      good: feedbacks.filter(f => f.rating >= 4 && f.rating < 4).length,
      average: feedbacks.filter(f => f.rating >= 3 && f.rating < 4).length,
      poor: feedbacks.filter(f => f.rating < 3).length
    };
  };

  const getReservationTrends = () => {
    const allReservations = [];
    restaurant?.diningTables?.forEach(table => {
      if (table.reservations) {
        allReservations.push(...table.reservations);
      }
    });

    return allReservations.reduce((acc, res) => {
      const month = moment(res.reservationTime).format('MM/YYYY');
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});
  };

  const reservationsData = Object.entries(getReservationTrends())
    .map(([month, count]) => ({
      month,
      reservations: count
    }))
    .sort((a, b) => moment(a.month, 'MM/YYYY').diff(moment(b.month, 'MM/YYYY')));

  const pieChartData = Object.entries(capacityDistribution || {}).map(([capacity, count]) => ({
    name: `${capacity} ${text.analytics.charts.capacityDistribution.seats}`,
    value: count
  }));

  const workHoursData = restaurant?.workHours?.map(hour => ({
    day: text.analytics.days[hour.dayOfWeek.toLowerCase()],
    hours: hour.isDayOff ? 0 :
      (new Date(`2000/01/01 ${hour.endTime}`) - new Date(`2000/01/01 ${hour.startTime}`)) / (1000 * 60 * 60)
  })) || [];

  const averageRating = restaurant?.rating.toFixed(2) || 0;
  const totalFeedbacks = restaurant?.feedbackList?.length || 0;
  const latestFeedbacks = restaurant?.feedbackList?.slice(-5) || [];

  const getReservationsStats = () => {
    let total = 0;
    let confirmed = 0;

    restaurant?.diningTables?.forEach(table => {
      table.reservations?.forEach(res => {
        total++;
        if (res.status === 'CONFIRMED') {
          confirmed++;
        }
      });
    });

    return {
      total,
      successRate: total > 0 ? (confirmed / total * 100).toFixed(1) : 0
    };
  };

  const statisticsCategories = {
    general: [
      {
        title: text.analytics.statistics.rating,
        value: averageRating,
        prefix: <StarOutlined style={{ color: '#faad14' }} />,
        suffix: "/ 5.0"
      },
      {
        title: text.analytics.statistics.popularity,
        value: restaurant?.popularityCount || 0,
        prefix: <EyeOutlined style={{ color: '#722ed1' }} />
      },
      {
        title: text.analytics.statistics.priceCategory,
        value: text.analytics.priceCategories[restaurant?.priceCategory?.toLowerCase()],
        prefix: <DollarOutlined style={{ color: '#13c2c2' }} />
      }
    ],
    feedback: [
      {
        title: text.analytics.statistics.totalFeedbacks,
        value: totalFeedbacks,
        prefix: <TeamOutlined style={{ color: '#1890ff' }} />
      }
    ],
    workHours: [
      {
        title: text.analytics.statistics.workingDays,
        value: workingDays.length,
        prefix: <ClockCircleOutlined style={{ color: '#eb2f96' }} />
      },
      {
        title: text.analytics.statistics.avgHoursDay,
        value: averageWorkingHours.toFixed(1),
        prefix: <ShopOutlined style={{ color: '#fa8c16' }} />,
        suffix: text.analytics.statistics.hours
      }
    ],
    reservations: [
      {
        title: text.analytics.statistics.tables,
        value: restaurant?.diningTables?.length || 0,
        prefix: <TableOutlined style={{ color: '#52c41a' }} />
      },
      {
        title: text.analytics.statistics.totalCapacity,
        value: totalCapacity,
        prefix: <UserOutlined style={{ color: '#fa541c' }} />
      },
      {
        title: text.analytics.statistics.totalReservations,
        value: getReservationsStats().total,
        prefix: <CalendarOutlined style={{ color: '#eb2f96' }} />
      },
      {
        title: text.analytics.statistics.reservationRate,
        value: getReservationsStats().successRate,
        prefix: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
        suffix: '%'
      }
    ]
  };

  return (
    <Modal
      title={text.analytics.title}
      open={visible}
      onCancel={onClose}
      width={1200}
      footer={null}
    >
      <div style={{ padding: 24 }}>
        <Collapse defaultActiveKey={['general']}>
          <Collapse.Panel key="general" header={text.analytics.categories.general}>
            <Row gutter={[16, 16]}>
              {statisticsCategories.general.map((stat, index) => (
                <Col span={8} key={index}>
                  <Card>
                    <Statistic
                      title={stat.title}
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Collapse.Panel>

          <Collapse.Panel key="feedback" header={text.analytics.categories.feedback}>
            <Row gutter={[16, 16]}>
              {statisticsCategories.feedback.map((stat, index) => (
                <Col span={8} key={index}>
                  <Card>
                    <Statistic
                      title={stat.title}
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              <Col span={24}>
                <Card title={text.analytics.charts.feedbackDistribution.title}>
                  <div style={{ height: 300 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={Object.entries(getFeedbackAnalytics()).map(([key, value]) => ({
                            name: text.analytics.feedback[key],
                            value
                          }))}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </Col>
            </Row>
            <Card title={text.analytics.feedback.latest} style={{ marginTop: 24 }}>
              {latestFeedbacks.map((feedback, index) => (
                <div key={index} style={{ marginBottom: 16 }}>
                  <Row justify="space-between">
                    <Col>
                      <strong>{feedback.user.name} {feedback.user.surname}</strong>
                    </Col>
                    <Col>
                      <StarOutlined style={{ color: '#faad14' }} /> {feedback.rating}
                    </Col>
                  </Row>
                  <div>{feedback.description}</div>
                  <div style={{ color: '#52c41a' }}>
                    {text.analytics.feedback.pros}: {feedback.advantages}
                  </div>
                  <div style={{ color: '#f5222d' }}>
                    {text.analytics.feedback.cons}: {feedback.disadvantages}
                  </div>
                  <Divider />
                </div>
              ))}
            </Card>
          </Collapse.Panel>

          <Collapse.Panel key="workHours" header={text.analytics.categories.workHours}>
            <Row gutter={[16, 16]}>
              {statisticsCategories.workHours.map((stat, index) => (
                <Col span={8} key={index}>
                  <Card>
                    <Statistic
                      title={stat.title}
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
            <Row style={{ marginTop: 16 }}>
              <Col span={24}>
                <Card title={text.analytics.charts.workingHours.title}>
                  <div style={{ height: 300 }}>
                    <ResponsiveContainer>
                      <BarChart data={workHoursData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="day"
                          interval={0}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar
                          dataKey="hours"
                          fill="#1890ff"
                          name={text.analytics.charts.workingHours.hours}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </Col>
            </Row>
          </Collapse.Panel>

          <Collapse.Panel key="reservations" header={text.analytics.categories.reservations}>
            <Row gutter={[16, 16]}>
              {statisticsCategories.reservations.map((stat, index) => (
                <Col span={6} key={index}>
                  <Card>
                    <Statistic
                      title={stat.title}
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Card title={text.analytics.charts.capacityDistribution.title}>
                  <div style={{ height: 300 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card title={text.analytics.charts.reservationTrends.title}>
                  <div style={{ height: 300 }}>
                    <ResponsiveContainer>
                      <LineChart data={reservationsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="reservations"
                          stroke="#8884d8"
                          name={text.analytics.charts.reservationTrends.count}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </Col>
            </Row>
          </Collapse.Panel>
        </Collapse>
      </div>
    </Modal>
  );
};

export default RestaurantAnalytics;