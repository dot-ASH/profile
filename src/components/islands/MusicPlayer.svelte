<script lang="ts">
  import { onDestroy } from 'svelte';
  import { openWithInterstitial } from '../../stores/ui';

  interface Props {
    /** Audio file to play. */
    src: string;
    /** Track title, rendered twice so the marquee loops seamlessly. */
    title: string;
    /** Where the title button sends you. */
    trackUrl: string;
    /** Where the Spotify button sends you. */
    playlistUrl: string;
    cover: string;
    playlistCover: string;
  }

  const { src, title, trackUrl, playlistUrl, cover, playlistCover }: Props = $props();

  let audio: HTMLAudioElement | null = null;
  let playing = $state(false);
  let coverVisible = $state(false);

  function start() {
    // Constructed on first interaction — playback needs a user gesture anyway,
    // and this keeps the audio off the network until someone asks for it.
    audio ??= new Audio(src);
    audio.addEventListener('ended', stop, { once: true });
    audio.play();
    playing = true;
  }

  function stop() {
    audio?.pause();
    playing = false;
    coverVisible = false;
  }

  onDestroy(() => {
    audio?.pause();
    audio = null;
  });
</script>

<div class="overlay-menu">
  <div id="play-music" class:playing>
    <button
      class="start"
      class:visible={coverVisible}
      onclick={start}
      onmouseenter={() => (coverVisible = true)}
      onfocus={() => (coverVisible = true)}
      aria-label={`Play ${title}`}
    >
      <img src={cover} alt="" width="40" height="40" />
    </button>
  </div>

  <div class="overlay-context" class:open={playing} aria-hidden={!playing}>
    <div class="overlay-context-text">
      <button onclick={() => openWithInterstitial(trackUrl)} tabindex={playing ? 0 : -1}>
        <p class:marquee={playing}>&nbsp; {title} &nbsp; {title}</p>
      </button>
    </div>
    <button class="stop" onclick={stop} aria-label="Stop" tabindex={playing ? 0 : -1}></button>
    <button
      class="spotii"
      onclick={() => openWithInterstitial(playlistUrl)}
      aria-label="Open the playlist on Spotify"
      tabindex={playing ? 0 : -1}
    >
      <img src={playlistCover} alt="" width="35" height="35" />
    </button>
  </div>
</div>

<style>
  .overlay-menu {
    position: absolute;
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    align-items: center;
    overflow: hidden;
    padding: 2rem;
    z-index: 3000;
    left: 4%;
  }

  #play-music {
    display: flex;
    width: 20px;
    height: 20px;
    background-color: var(--cream);
    z-index: 3000;
    border-radius: 50%;
    box-shadow: 0 0 10px 3px #ccccccb8;
    animation: beep infinite 3s linear;
    transition: 500ms ease-out;
  }

  /* while playing, the pulse stops and the dot holds still */
  #play-music.playing {
    animation: none;
    transform: scale(1);
  }

  #play-music button {
    margin: auto auto;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    justify-content: center;
    overflow: hidden;
    background-size: cover;
    opacity: 0;
    transition: opacity 500ms ease-out;
  }

  #play-music button.visible,
  #play-music button:hover,
  #play-music button:focus-visible {
    opacity: 1;
  }

  #play-music button img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .overlay-context {
    height: 2.5rem;
    width: 0;
    opacity: 0;
    background-color: var(--cream);
    box-shadow: 0 0 10px 3px #ccccccb8;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.5rem;
    overflow: hidden;
    transition: width 500ms ease-in, opacity 500ms ease-in;
  }

  .overlay-context.open {
    width: 15rem;
    opacity: 1;
  }

  .overlay-context-text {
    width: 9rem;
    overflow: hidden;
  }

  .overlay-context-text p {
    font-family: 'Source Code Pro';
    white-space: nowrap;
    width: max-content;
    font-size: smaller;
  }

  .overlay-context-text p.marquee {
    animation: marquee 20s linear infinite;
  }

  .overlay-context .stop {
    margin-top: 2px;
    margin-left: -0.5rem;
    width: 1.3rem;
    height: 1.3rem;
    flex-shrink: 0;
    border-radius: 5px;
    background-color: #474747df;
    box-shadow: 0 0 5px 1px #424242b8;
    transition: background-color 500ms cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  .stop:hover {
    background-color: #323232df;
  }

  .spotii {
    margin-top: 3px;
    width: 35px;
    height: 35px;
    flex-shrink: 0;
    border-radius: 50%;
    box-shadow: 0 0 5px 2px #343434b8;
    overflow: hidden;
  }

  .spotii img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @keyframes beep {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes marquee {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-50%);
    }
  }

  @media (min-width: 420px) {
    .overlay-menu {
      left: 7%;
    }
  }

  @media (min-width: 640px) {
    .overlay-menu {
      left: 50%;
    }
  }

  @media (min-width: 800px) {
    .overlay-menu {
      left: 57%;
    }
  }

  @media (min-width: 900px) {
    .overlay-menu {
      left: 67%;
    }
  }
</style>
