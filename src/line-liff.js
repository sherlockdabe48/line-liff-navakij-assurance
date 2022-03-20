
async function runLiff() {
  // Initialize LIFF app)
  console.log("YO Line")
  await liff.init({ liffId: '1656915926-p1LyQKPo' });
  // Try a LIFF function

  getUserProfile();
}
runLiff()
var lineProfile = {}

async function getUserProfile() {
  const profile = await liff.getProfile();
  pictureUrl.src = profile.pictureUrl;
  userId.innerHTML = '<b>userId:</b> ' + profile.userId;
  statusMessage.innerHTML = '<b>statusMessage:</b> ' + profile.statusMessage;
  displayName.innerHTML = '<b>displayName:</b> ' + profile.displayName;
  profileObject.innerHTML = '<b>profileObject:</b> ' + profile;
  console.log('profile ' + profile);
  lineProfile = profile
}


