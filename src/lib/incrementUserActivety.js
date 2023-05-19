import User from '@/models/userModel';

export const incrementUserActivety = async (userId) => {
  const user = await User.findById(userId);
  await user.updateOne(
    { $inc: { activetyCount: 1 } },
    { validateBeforeSave: false }
  );
};
