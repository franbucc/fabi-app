// playerService.js
import { db } from './firebase';

const players = [];

export async function fetchPlayers() {
  try {
    const querySnapshot = await getDocs(collection(db, 'players'));
    querySnapshot.forEach(async (doc) => {
      const player = doc.data();
      player.id = doc.id;
      player.comments = [];
      const commentsSnapshot = await getDocs(collection(db, 'players', player.id, 'comments'));
      commentsSnapshot.forEach(commentDoc => {
        player.comments.push(commentDoc.data());
      });
      players.push(player);
    });
  } catch (error) {
    console.error('Error fetching players: ', error);
  }
}

export function getPlayers() {
  return players;
}
