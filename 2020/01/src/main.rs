use std::fs;

fn main() {

    // We want numbers totalling 2020.
    let target = 2020;

    // Parse input.txt into a vector
    let input: Vec<i32> = fs::read_to_string("input.txt").expect("Can't find input.txt!")
    .lines()
    .map(|s| s.parse().unwrap())
    .collect();

    println!("Part 1:");
    let pair = find_pair(target, input.clone()).expect("Could not find a matching pair!");
    let (a, b) = pair;
    println!("Pair totalling {} is {} + {}", target, a, b);

    let product = a*b;
    println!("Product of pair is {}", product);

    // Regretting this approach ........
    println!("Part 2:");
    let triplet = find_triplet(target, input.clone()).expect("Could not find a matching triplet!");
    let (a, b, c) = triplet;
    println!("Pair totalling {} is {} + {} + {}", target, a, b, c);
    let part2_product = a*b*c;
    println!("Product of triplet is {}", part2_product);
}

pub fn find_pair(total: i32, list: Vec<i32>) -> Result<(i32, i32), String> {

    for &primary in &list {
        let secondary = total - primary;

        if list.contains(&secondary) {
            return Ok((primary, secondary));
        }
    }

    return Err("Could not find any matching numbers".to_string());
}

pub fn find_triplet(total: i32, list: Vec<i32>) -> Result<(i32, i32, i32), String> {
    for &primary in &list {
        let sub_total = total - primary;
        let sub_list = list.clone();

        let pair = find_pair(sub_total, sub_list);
        if pair.is_err() == false {
            let (secondary, tertiary) = pair.unwrap();
            return Ok((primary, secondary, tertiary))
        }
    }

    return Err("Could not find any matching numbers".to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn finds_pair() {
        let test_data: Vec<i32> =
            "1721
            979
            366
            299
            675
            1456"
        .lines()
        .map(|s| s.trim().parse().expect("parse error"))
        .collect();

        assert_eq!(find_pair(2020, test_data).unwrap(), (1721, 299));
    }

    #[test]
    fn does_not_find_pair() {
        let test_data: Vec<i32> =
            "1
            2"
        .lines()
        .map(|s| s.trim().parse().expect("parse error"))
        .collect();

        assert_eq!(find_pair(999, test_data).is_err(), true);
    }

    #[test]
    fn finds_triplet() {
        let test_data: Vec<i32> =
            "1721
            979
            366
            299
            675
            1456"
        .lines()
        .map(|s| s.trim().parse().expect("parse error"))
        .collect();

        assert_eq!(find_triplet(2020, test_data).unwrap(), (979, 366, 675));
    }

}
