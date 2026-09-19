export interface CalendarEvent {
  title: string;
  start_at: string;
  end_at?: string;
  location?: string;
  color?: string;
  status?: string;
}

export const events: CalendarEvent[] = [];
