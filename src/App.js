import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import TopBar from './components/TopBar/TopBar';
import Channel from './components/Channel/Channel';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import { channelsData } from './data/channelsData';

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeChannel, setActiveChannel] = useState('reality-tv');
  const [videoData, setVideoData] = useState(null);

  const handlePlayVideo = (showTitle, videoUrl) => {
    setVideoData({ title: showTitle, url: videoUrl });
  };

  const handleCloseVideo = () => {
    setVideoData(null);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="app">
      {!videoData && (
        <>
          <Sidebar
            channels={channelsData}
            activeChannel={activeChannel}
            onChannelSelect={setActiveChannel}
            width={sidebarWidth}
            onWidthChange={setSidebarWidth}
            isCollapsed={isSidebarCollapsed}
            onToggle={toggleSidebar}
          />
          <div className="app-container" style={{ 
            marginLeft: isSidebarCollapsed ? '0' : `${sidebarWidth}px`,
            transition: 'margin-left 0.3s ease'
          }}>
            <TopBar 
              isSidebarCollapsed={isSidebarCollapsed}
              onToggleSidebar={toggleSidebar}
            />
            <main className="main-content">
              {channelsData.map(channel => (
                <Channel
                  key={channel.id}
                  channel={channel}
                  isActive={activeChannel === channel.id}
                  onPlayVideo={handlePlayVideo}
                />
              ))}
            </main>
          </div>
        </>
      )}
      
      {videoData && (
        <VideoPlayer
          title={videoData.title}
          videoUrl={videoData.url}
          onClose={handleCloseVideo}
        />
      )}
    </div>
  );
}

export default App;
