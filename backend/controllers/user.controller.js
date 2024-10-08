import User from '../models/user.model.js'
export const getUserProfileAndRepos = async (req, res) => {
  const { username } = req.params;
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    }); // Fetching the user response for that GitHub account
    // if (!userRes.ok) {
    //   throw new Error(`Error: ${userRes.status} ${userRes.statusText}`);
    // }
    const userProfile = await userRes.json(); // This gives the user profile

    // Fetch the repo_url
    const repoRes = await fetch(userProfile.repos_url, {
      headers: {
        Authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });
    // if (!repoRes.ok) {
    //   throw new Error(`Error: ${repoRes.status} ${repoRes.statusText}`);
    // }
    const repos = await repoRes.json(); // This gives the userProfile repos
    res.status(200).json({ userProfile, repos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//likes
export const likeProfile = async (req, res) => {
	try {
		const { username } = req.params;
		const user = await User.findById(req.user._id.toString());
		console.log(user, "auth user");
		const userToLike = await User.findOne({ username });

		if (!userToLike) {
			return res.status(404).json({ error: "User is not a member" });
		}

		if (user.likedProfiles.includes(userToLike.username)) {
			return res.status(400).json({ error: "User already liked" });
		}

		userToLike.likedBy.push({ username: user.username, avatarUrl: user.avatarUrl, likedDate: Date.now() });
		user.likedProfiles.push(userToLike.username);

		// await userToLike.save();
		// await user.save();
		await Promise.all([userToLike.save(), user.save()]);

		res.status(200).json({ message: "User liked" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getLikes = async (req, res) => {
	try {
		const user = await User.findById(req.user._id.toString());
		res.status(200).json({ likedBy: user.likedBy });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};