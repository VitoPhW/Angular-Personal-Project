using System;

namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateSeniority(this DateTime doc)
        {
            var seniority = DateTime.Today.Year-doc.Year;
            if(doc.AddYears(seniority) > DateTime.Today) seniority--;
            return seniority;
        }
    }
}