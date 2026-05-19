const sessions = new Map();

export function getHistory(user_id) {
  if (!sessions.has(user_id)) {
    sessions.set(user_id, []);
  }
  return sessions.get(user_id);
}

export function addMessage(user_id, role, content) {
  const history = getHistory(user_id);

  history.push({ role, content });

  if (history.length > 6) {
    history.shift();
  }
}