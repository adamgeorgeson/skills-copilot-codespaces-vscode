function skillsMember()
{
    var member = document.getElementById("member").value;
    var skills = document.getElementById("skills").value;
    var url = "member.php?member=" + member + "&skills=" + skills;
    window.location.href = url;
}