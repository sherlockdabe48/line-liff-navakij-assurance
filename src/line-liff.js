
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
  console.log('profile ' + profile);
  lineProfile = profile
}


