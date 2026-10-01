create table if not exists enquiries (
  id uuid primary key,
  name varchar(100) not null,
  email varchar(254) not null,
  phone varchar(40),
  university varchar(200),
  country varchar(100) not null,
  study_country varchar(100) not null,
  service varchar(80) not null,
  message text not null,
  contact_method varchar(20) not null,
  status varchar(20) not null default 'new'
    check (status in ('new', 'contacted', 'in_progress', 'completed', 'closed')),
  consent_at timestamptz not null,
  notification_status varchar(20) not null default 'not_configured'
    check (notification_status in ('not_configured', 'pending', 'sent', 'failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists enquiries_created_at_idx on enquiries (created_at desc);
create index if not exists enquiries_status_idx on enquiries (status, created_at desc);

create table if not exists enquiry_rate_limits (
  key varchar(64) primary key,
  window_started_at timestamptz not null default now(),
  attempts integer not null default 1
);
