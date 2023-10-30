

# Ties (Development)
Ties is the most delightful way to stay in touch with people that mean a lot to you.

## Setup
- Ties is built with a [Supabase](http://supabase.com/) backend, so the first thing you'd want create a new project (Create a supabase account). Follow this video if you don't know what supabase is. After creating your project, you'll need to copy `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

- Next, create a new `.env` file and copy over the contents of `example.env`.

    ```
        NEXT_PUBLIC_SUPABASE_URL=
        NEXT_PUBLIC_SUPABASE_ANON_KEY=
        RESEND_API_KEY=
    ```

- Then head over to resend to get your API keys.
- Create `connections` and `reach_outs` tables with the following scripts in `script.sql`. 
- Start the application with `yarn dev`

### Contributing

The project is in early stages, so I'm currently accepting as much contribution as possible. If you'd like to contribute, [reach out to me](https://twitter.com/vick_OnRails! 
