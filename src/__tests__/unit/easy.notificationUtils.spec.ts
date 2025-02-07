import { Event } from '../../types';
import { createNotificationMessage, getUpcomingEvents } from '../../utils/notificationUtils';

describe('getUpcomingEvents', () => {
  const event1: Event = {
    id: '1',
    title: '이벤트 1',
    description: '이벤트 1입니다',
    location: '위치 1',
    date: '2024-07-01',
    startTime: '09:00',
    endTime: '10:00',
    category: '카테고리 1',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 10,
  };

  const event2: Event = {
    id: '2',
    title: '이벤트 2',
    description: '이벤트 2입니다',
    location: '위치 2',
    date: '2024-07-02',
    startTime: '09:00',
    endTime: '10:00',
    category: '카테고리 2',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 10,
  };

  const event3: Event = {
    id: '3',
    title: '이벤트 3',
    description: '이벤트 3입니다',
    location: '위치 3',
    date: '2024-08-01',
    startTime: '09:00',
    endTime: '10:00',
    category: '카테고리 1',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 10,
  };

  const event4: Event = {
    id: '4',
    title: 'Event 4',
    description: '이벤트 4입니다',
    location: '위치 4',
    date: '2024-08-02',
    startTime: '12:00',
    endTime: '15:00',
    category: '카테고리 2',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 10,
  };

  const events: Event[] = [event1, event2, event3, event4];

  it('알림 시간이 정확히 도래한 이벤트를 반환한다', () => {
    const now = new Date('2024-07-01T08:50:00');
    const notifiedEvents: string[] = [];
    const upcomingEvents = getUpcomingEvents(events, now, notifiedEvents);
    expect(upcomingEvents).toEqual([event1]);
  });

  it('이미 알림이 간 이벤트는 제외한다', () => {
    const now = new Date('2024-07-01T08:50:00');
    const notifiedEvents: string[] = ['1'];
    const upcomingEvents = getUpcomingEvents(events, now, notifiedEvents);
    expect(upcomingEvents).toEqual([]);
  });

  it('알림 시간이 아직 도래하지 않은 이벤트는 반환하지 않는다', () => {
    const now = new Date('2024-07-01T08:40:00');
    const notifiedEvents: string[] = [];
    const upcomingEvents = getUpcomingEvents(events, now, notifiedEvents);
    expect(upcomingEvents).toEqual([]);
  });

  it('알림 시간이 지난 이벤트는 반환하지 않는다', () => {
    const now = new Date('2024-07-01T09:00:00');
    const notifiedEvents: string[] = [];
    const upcomingEvents = getUpcomingEvents(events, now, notifiedEvents);
    expect(upcomingEvents).toEqual([]);
  });
});

describe('createNotificationMessage', () => {
  it('올바른 알림 메시지를 생성해야 한다', () => {
    const event: Event = {
      id: '1',
      title: '이벤트 1',
      description: '이벤트 1입니다',
      location: '위치 1',
      date: '2024-07-01',
      startTime: '09:00',
      endTime: '10:00',
      category: '카테고리 1',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    };

    const message = createNotificationMessage(event);
    expect(message).toBe('10분 후 이벤트 1 일정이 시작됩니다.');
  });
});
