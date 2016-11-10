var ref = database.ref("Users/typham");
ref.update({
   onlineState: true,
   status: "I'm online."
});
ref.onDisconnect().update({
  onlineState: false,
  status: "I'm offline."
});
