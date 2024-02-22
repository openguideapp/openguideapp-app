import TrackPlayer, { Event, useProgress } from 'react-native-track-player';

export const PlaybackService = async function () {

    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

    // TrackPlayer.addEventListener(Event.RemoteJumpForward, async () => {
    //     const progress = useProgress(1000)
    //     const newPosition = progress.position + 10
    //     await TrackPlayer.seekTo(newPosition > 0 ? newPosition : 0)
    //     TrackPlayer.pause()
    // });

    // TrackPlayer.addEventListener(Event.RemoteJumpBackward, async () => {
    //     const progress = useProgress(1000)
    //     const newPosition = progress.position - 10
    //     await TrackPlayer.seekTo(newPosition > 0 ? newPosition : 0)
    //     TrackPlayer.pause()
    // });
};