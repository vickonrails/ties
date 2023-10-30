-- Create Connection
CREATE TABLE connection (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    fullname text not null,
    bio text,
    email_address text not null,
    occupation text,
    company text,
    birthday date,
    city text,
    country text,
    timezone text,
    interests text,
    common_interests text,
    tags text,
    friendship_level integer,
    reach_out_frequency text,
    contact_info jsonb[],
    value_to_them text,
    value_to_me text,
    contact_frequency text,
    origin_context text,
    linkedin_url text,
    x_url text,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP
);

-- Create Reach outs
CREATE TABLE reach_outs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  type integer not null,
  email_address text not null,
  connection_id uuid not null,
  message text not null,
  subject text not null,

  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP
)