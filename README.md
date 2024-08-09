# canvas.michaelli.me

canvas.michaelli.me is a real-time, interactive pixel art platform where users can create and share art on a communal digital canvas, based on the r/place Reddit community project.

## Features

- Real-time collaborative drawing
- Customizable color palette
- Zoom and pan controls
- Color picker tool
- Responsive design for various screen sizes

## Technologies Used

- Next.js
- React
- TypeScript
- Supabase (for real-time database)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- A Supabase account and project

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/collaborative-canvas.git
   cd collaborative-canvas
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

- Click on any pixel to color it
- Use the color picker to select custom colors
- Zoom in and out using the controls or mouse wheel
- Pan around the canvas by clicking and dragging

## Deployment

This project is set up for easy deployment on Vercel. Simply connect your GitHub repository to Vercel and it will automatically deploy your main branch.

Make sure to set up your environment variables in the Vercel project settings.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.io/)
- [React Color](https://casesandberg.github.io/react-color/)
- [Panzoom](https://github.com/timmywil/panzoom)