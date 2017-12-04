/**
 * both :: (a -> Bool) -> (a -> Bool) -> a -> Bool
 * both f g x = f x && g x
 *
 * https://stackoverflow.com/a/1712054/96301
 * by Jeremy Ruten
 * https://stackoverflow.com/users/813/jeremy-ruten
 */
export default f => g => x => f(x) && g(x)
