import { Event } from '../../types';
import { getFilteredEvents } from '../../utils/eventUtils';

describe('getFilteredEvents', () => {
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

  it("검색어 '이벤트 2'에 맞는 이벤트만 반환한다", () => {
    const filteredEvents = getFilteredEvents(events, '이벤트 2', new Date('2024-07-01'), 'week');
    expect(filteredEvents).toEqual([event2]);
  });

  it('주간 뷰에서 2024-07-01 주의 이벤트만 반환한다', () => {
    const filteredEvents = getFilteredEvents(events, '', new Date('2024-07-01'), 'week');
    expect(filteredEvents).toEqual([event1, event2]);
  });

  it('월간 뷰에서 2024년 7월의 모든 이벤트를 반환한다', () => {
    const filteredEvents = getFilteredEvents(events, '', new Date('2024-07-01'), 'month');
    expect(filteredEvents).toEqual([event1, event2]);
  });

  it("검색어 '이벤트'와 주간 뷰 필터링을 동시에 적용한다", () => {
    const filteredEvents = getFilteredEvents(events, '이벤트', new Date('2024-07-01'), 'week');
    expect(filteredEvents).toEqual([event1, event2]);
  });

  it('검색어가 없을 때 모든 이벤트를 반환한다', () => {
    const filteredEvents = getFilteredEvents(events, '', new Date('2024-07-01'), 'week');
    expect(filteredEvents).toEqual([event1, event2]);
  });

  it('검색어가 대소문자를 구분하지 않고 작동한다', () => {
    const filteredEvents = getFilteredEvents(events, 'event 4', new Date('2024-08-02'), 'week');
    expect(filteredEvents).toEqual([event4]);
  });

  it('월의 경계에 있는 이벤트를 올바르게 필터링한다', () => {
    const filteredEvents = getFilteredEvents(events, '', new Date('2024-07-31'), 'month');
    expect(filteredEvents).toEqual([event1, event2]);
  });

  it('빈 이벤트 리스트에 대해 빈 배열을 반환한다', () => {
    const filteredEvents = getFilteredEvents([], '', new Date('2024-07-01'), 'week');
    expect(filteredEvents).toEqual([]);
  });
});
