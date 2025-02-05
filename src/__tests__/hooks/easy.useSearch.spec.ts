import { act, renderHook } from '@testing-library/react';

import { useSearch } from '../../hooks/useSearch';
import { Event } from '../../types';

describe('useSearch test', () => {
  const mockEvents: Event[] = [
    {
      id: '1',
      title: '회의',
      date: '2024-02-05',
      startTime: '10:00',
      endTime: '11:00',
      description: '팀 회의 진행',
      location: '회의실',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
    {
      id: '2',
      title: '점심 식사',
      date: '2024-02-05',
      startTime: '12:00',
      endTime: '13:00',
      description: '동료들과 점심',
      location: '식당',
      category: '개인',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 30,
    },
    {
      id: '3',
      title: '프로젝트 발표',
      date: '2024-02-06',
      startTime: '14:00',
      endTime: '15:00',
      description: '고객사 대상 발표',
      location: '본사',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 15,
    },
  ];

  const currentDate = new Date('2024-02-05');

  it('검색어가 비어있을 때 모든 이벤트를 반환해야 한다', () => {
    const { result } = renderHook(() => useSearch(mockEvents, currentDate, 'month'));

    expect(result.current.filteredEvents).toEqual(mockEvents);
  });

  it('검색어에 맞는 이벤트만 필터링해야 한다', () => {
    const { result } = renderHook(() => useSearch(mockEvents, currentDate, 'month'));

    act(() => {
      result.current.setSearchTerm('회의');
    });

    expect(result.current.filteredEvents).toEqual([mockEvents[0]]);
  });

  it('검색어가 제목, 설명, 위치 중 하나라도 일치하면 해당 이벤트를 반환해야 한다', () => {
    const { result } = renderHook(() => useSearch(mockEvents, currentDate, 'month'));

    act(() => {
      result.current.setSearchTerm('본사');
    });

    expect(result.current.filteredEvents).toEqual([mockEvents[2]]);
  });

  it('현재 뷰(주간/월간)에 해당하는 이벤트만 반환해야 한다', () => {
    const { result: weekResult } = renderHook(() => useSearch(mockEvents, currentDate, 'week'));
    const { result: monthResult } = renderHook(() => useSearch(mockEvents, currentDate, 'month'));

    const weekFilteredEventDates = weekResult.current.filteredEvents.map((event) => event.date);
    const monthFilteredEventDates = monthResult.current.filteredEvents.map((event) => event.date);

    const expectedWeekDates = ['2024-02-05', '2024-02-06'];

    expectedWeekDates.forEach((date) => {
      expect(weekFilteredEventDates).toContain(date);
    });

    const expectedMonthDates = ['2024-02-05', '2024-02-06'];
    expectedMonthDates.forEach((date) => {
      expect(monthFilteredEventDates).toContain(date);
    });
  });

  it("검색어를 '회의'에서 '점심'으로 변경하면 필터링된 결과가 즉시 업데이트되어야 한다", () => {
    const { result } = renderHook(() => useSearch(mockEvents, currentDate, 'month'));

    act(() => {
      result.current.setSearchTerm('회의');
    });

    expect(result.current.filteredEvents).toEqual([mockEvents[0]]);

    act(() => {
      result.current.setSearchTerm('점심');
    });

    expect(result.current.filteredEvents).toEqual([mockEvents[1]]);
  });
});
